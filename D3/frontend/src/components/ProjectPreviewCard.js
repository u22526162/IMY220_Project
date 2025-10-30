import React from "react";
import { Link } from "react-router-dom";

export default function ProjectPreviewCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <small>{project.date}</small>
      <Link to={`/project/${project.id}`}>View</Link>
    </div>
  );
}
