import React, { useEffect, useState } from "react";
import FeedItem from "../components/FeedItem";
import SearchBar from "../components/SearchBar";
import { checkinAPI, projectAPI } from "../api";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await projectAPI.getProjects();
        setProjects(list.map(p => ({ project: p.name, date: new Date(p.updatedAt || p.createdAt).toLocaleDateString() })));
      } catch {}
      try {
        const checkins = await checkinAPI.getCheckins();
        setFeed(checkins.map(c => ({ user: c.user?.username || "", project: c.project?.name || "", date: new Date(c.createdAt).toLocaleDateString(), userId: c.userId, projectId: c.projectId })));
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="dashboard">
        <SearchBar />
      <h2>Recent Activity</h2>
      {feed.map((p, index) => (
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
