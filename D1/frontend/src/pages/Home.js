import React from "react";
import FeedItem from "../components/FeedItem";

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
      <h2>Friends’ Activity</h2>
      {friends.map((p, index) => (
        <FeedItem key={index} item={p} />
      ))}
      <h2>Trending:</h2>
      <div className="projects-grid">
        {projects.map((p, id) => (
          <FeedItem
            key={id}
            item={p}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
