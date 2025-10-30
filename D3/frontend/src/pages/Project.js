// Amadeus Fidos u22526162
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/project.css";
import { projectAPI } from "../api";

export default function Projectpage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await projectAPI.getProject(id);
        setProject({
          id: p._id || id,
          name: p.name,
          description: p.description,
          date: new Date(p.updatedAt || p.createdAt).toLocaleDateString(),
          changelog: p.changelog || []
        });
      } catch {}
    };
    if (id) load();
  }, [id]);

  if (!project) return null;
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
