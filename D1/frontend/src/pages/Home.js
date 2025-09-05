import React from "react";
import Header from "../components/Header";
import FriendActivity from "../components/FriendActivity";
import ProjectCard from "../components/ProjectCard";

function HomePage({ onNavigate }) {
  const projects = [
    { name: "AI Chat Bot", date: "2 September" },
    { name: "Totally Very Secure App", date: "25 August" },
  ];

  const friends = [
    { user: "Friend123", project: "Calculator app" }
  ];

  return (
    <div className="dashboard">
      <Header />
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((p, id) => (
          <ProjectCard
            key={id}
            project={p}
            onClick={() => onNavigate("project")}
          />
        ))}
      </div>

      <h2>Friends’ Activity</h2>
      {friends.map((f, idx) => (
        <FriendActivity key={idx} activity={f} />
      ))}
    </div>
  );
}

export default Dashboard;
