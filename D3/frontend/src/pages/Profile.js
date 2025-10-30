// Amadeus Fidos u22526162
import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import "../styles/buttons.css";
import ProjectPreviewCard from "../components/ProjectPreviewCard";
import AddProject from "../components/AddProject";
import { userAPI, projectAPI } from "../api";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({
    avatar: "/assets/images/default.jpg",
    name: "",
    bio: "",
    email: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (!parsed?.id) return;
    const load = async () => {
      try {
        const profile = await userAPI.getProfile(parsed.id);
        setUser({
          avatar: profile?.profile?.avatar || "/assets/images/default.jpg",
          name: profile?.profile?.name || parsed.username || "",
          bio: profile?.profile?.bio || "",
          email: profile?.email || "",
        });
      } catch {}
      try {
        const list = await projectAPI.getProjects();
        setProjects(list.map(p => ({
          id: p._id || p.id,
          name: p.name,
          description: p.description,
          date: new Date(p.updatedAt || p.createdAt).toLocaleDateString()
        })));
      } catch {}
    };
    load();
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      await projectAPI.createProject({
        name: newProject.name,
        description: newProject.description,
        hashtags: []
      });
      const list = await projectAPI.getProjects();
      setProjects(list.map(p => ({
        id: p._id || p.id,
        name: p.name,
        description: p.description,
        date: new Date(p.updatedAt || p.createdAt).toLocaleDateString()
      })));
    } catch {}
  };

  return (
    <div className="profile-page">
      <div className="profile-left">
        <img src={user.avatar} alt={user.name} className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">{user.email}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
          <Link className="btn-link btn-secondary" to="/profile/edit">Edit Profile</Link>
        </div>
      </div>
      <div className="profile-right">
        <div className="section-header">
          <h3 className="profile-section-title">Projects</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary btn-sm"
            >
              + Add Project
            </button>
          </div>
        </div>
        <div className="profile-projects">
          {projects.map((p) => (
            <ProjectPreviewCard key={p.id} project={p} />
          ))}
        </div>
      </div>
      
      <AddProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
