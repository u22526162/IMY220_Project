import React from "react";
import { useParams } from "react-router-dom";
import "../styles/project.css";

export default function Projectpage() {
  const { id } = useParams();

  const project = {
    id,
    name: "Weather App 1.1.2",
    description: "Track and visualize weather data",
    date: "Last updated 2 Sept",
    changelog: [
      { version: "1.1.2", note: "Bug fix" },
      { version: "1.1.0", note: "Added API integration" },
      { version: "1.0.0", note: "Initial release" }
    ]
  };

  return (
    <div className="project-detail-page">
      <div className="project-detail-hero">
        <h2>{project.name}</h2>
        <small>{project.date}</small>
        <p>{project.description}</p>
      </div>

      <div className="project-detail-changelog">
        <h3>Changes</h3>
        <ul>
          {project.changelog.map((item, idx) => (
            <li key={idx}>
              <span className="changelog-version">{item.version}</span>
              <span className="changelog-note">{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
