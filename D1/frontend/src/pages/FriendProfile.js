import React from "react";
import "../styles/profile.css";
import ProjectPreviewCard from "../components/ProjectPreviewCard";

export default function FriendProfilePage() {
  const friend = {
    avatar: "/images/friend.png",
    name: "Friend123",
    bio: "Open source contributor",
    email: "friend123@example.com",
  };

  const projects = [
    { id: 10, name: "ChatBot 1 Sales App", description: "Sales chat bot", date: "2 Sept" },
    { id: 11, name: "Calculator App", description: "Updated version", date: "30 Aug" },
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
