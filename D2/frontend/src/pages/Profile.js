import React from "react";
import "../styles/profile.css";
import ProjectPreviewCard from "../components/ProjectPreviewCard";

export default function UserProfile() {
  const user = {
    avatar: "/images/user1.png",
    name: "Amadeus",
    bio: "Frontend developer & designer",
    email: "amadeus@example.com",
  };

  const projects = [
    { id: 1, name: "Calculator app", description: "A cool calculator", date: "27 June" },
    { id: 2, name: "Weather app 1.1.2", description: "Weather tracking", date: "Bug fix 1.1.2" },
  ];

  return (
    <div className="profile-page">
      <div className="profile-left">
        <img src={user.avatar} alt={user.name} className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-right">
        <h3 className="profile-section-title">Projects</h3>
        <div className="profile-projects">
          {projects.map((p) => (
            <ProjectPreviewCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
