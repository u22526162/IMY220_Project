import React, { useEffect, useState } from "react";
import "../styles/profile.css";
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
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-page" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2 className="profile-section-title">Edit Profile</h2>
      {error && <div className="error">{error}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <button type="button" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}


