// Amadeus Fidos u22526162
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/project.css";
import "../styles/buttons.css";
import { projectAPI, checkinAPI } from "../api";
import ChangeLogList from "../components/ChangeLogList";

export default function Projectpage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCheckins = async (projectId) => {
    try {
      const items = await checkinAPI.getProjectCheckins(projectId);
      setCheckins(items.map(c => ({
        id: c._id || c.id,
        message: c.message,
        date: new Date(c.createdAt).toLocaleString(),
        user: c.user?.username
      })));
    } catch {}
  };

  useEffect(() => {
    const load = async () => {
      try {
        const p = await projectAPI.getProject(id);
        setProject({
          id: p._id || id,
          name: p.name,
          description: p.description,
          date: new Date(p.updatedAt || p.createdAt).toLocaleDateString(),
          changelog: (p.changelog || []).map(ci => ({ version: ci.version, note: ci.note }))
        });
      } catch {}
      await loadCheckins(id);
    };
    if (id) load();
  }, [id]);

  async function handleAddCheckin() {
    if (!message.trim()) return;
    setSaving(true);
    try {
      await checkinAPI.createCheckin({ projectId: id, message });
      setMessage("");
      await loadCheckins(id);
    } catch {}
    setSaving(false);
  }

  if (!project) return null;
  return (
    <div className="project-detail-page">
      <div className="project-detail-hero">
        <h2>{project.name}</h2>
        <small>{project.date}</small>
        <p>{project.description}</p>
      </div>

      <div className="project-detail-changelog">
        <ChangeLogList items={project.changelog} />
      </div>

      <div className="project-checkins">
        <h3>Check-ins</h3>
        <div className="checkin-form">
          <input
            type="text"
            placeholder="What did you work on?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAddCheckin} disabled={saving}>
            {saving ? 'Saving...' : 'Add Check-in'}
          </button>
        </div>
        <ChangeLogList items={checkins} />
      </div>
    </div>
  );
}
