// Amadeus Fidos u22526162
import React, { useEffect, useState } from "react";
import { projectAPI } from "../api";
import AddProject from "../components/AddProject";
import ProjectPreviewCard from "../components/ProjectPreviewCard";
import "../styles/dashboard.css";
import "../styles/buttons.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProjects = async () => {
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

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      await projectAPI.createProject({ name: newProject.name, description: newProject.description, hashtags: [] });
      await loadProjects();
      setIsModalOpen(false);
    } catch {}
  };

  return (
    <div className="dashboard-page">
      <div className="section-header">
        <h2 className="section-title" style={{ margin: 0 }}>Your Projects</h2>
        <button className="btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>+ Add Project</button>
      </div>
      <div className="card-list">
        {projects.map(p => (
          <ProjectPreviewCard key={p.id} project={p} />
        ))}
      </div>
      <AddProject isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProject={handleAddProject} />
    </div>
  );
}
