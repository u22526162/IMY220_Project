// Amadeus Fidos u22526162
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectCard.css";

export default function ProjectPreviewCard({ project }) {
  return (
    <Link to={`/project/${project.id}`} className="project-card-link">
      <div className="project-card">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <small>{project.date}</small>
      </div>
    </Link>
  );
}
