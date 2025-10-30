import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import "../styles/editProfile.css";
import { userAPI } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const stored = localStorage.getItem('user');
  const parsed = stored ? JSON.parse(stored) : null;
  const userId = parsed?.id;

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      try {
        const profile = await userAPI.getProfile(userId);
        setName(profile?.profile?.name || parsed?.username || "");
        setBio(profile?.profile?.bio || "");
      } catch {}
    };
    load();
  }, [userId]);

  async function handleSave() {
    if (!userId) return;
    if (name && name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await userAPI.updateProfile(userId, { name, bio, avatar: "/assets/images/default.jpg" });
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-card">
        <h2 className="edit-title">Edit Profile</h2>
        {error && <div className="error">{error}</div>}
        <div className="edit-field">
          <label>Name</label>
          <input className="edit-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="edit-field">
          <label>Bio</label>
          <textarea className="edit-textarea" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="edit-actions">
          <button type="button" className="btn-primary-modal" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}


