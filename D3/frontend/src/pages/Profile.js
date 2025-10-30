import React, { useState } from "react";
import "../styles/profile.css";
import ProjectPreviewCard from "../components/ProjectPreviewCard";
import AddProject from "../components/AddProject";

export default function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, name: "Calculator app", description: "A cool calculator", date: "27 June" },
    { id: 2, name: "Weather app 1.1.2", description: "Weather tracking", date: "Bug fix 1.1.2" },
  ]);

  const user = {
    avatar: "/images/user1.png",
    name: "Amadeus",
    bio: "Frontend developer & designer",
    email: "amadeus@example.com",
  };

  const handleAddProject = (newProject) => {
    const project = {
      id: Date.now(), // Simple ID generation for demo
      name: newProject.name,
      description: newProject.description,
      date: "Just now"
    };
    setProjects(prev => [...prev, project]);
  };

  return (
    <div className="profile-page">
      <div className="profile-left">
        <img src={user.avatar} alt={user.name} className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-right">
        <div className="flex justify-between items-center mb-4">
          <h3 className="profile-section-title">Projects</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Project
          </button>
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
