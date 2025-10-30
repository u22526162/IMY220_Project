// Amadeus Fidos u22526162
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedItem from "../components/FeedItem";
import SearchBar from "../components/SearchBar";
import { checkinAPI, projectAPI } from "../api";
import "../styles/dashboard.css";

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await projectAPI.getTrending();
        setTrending(t.map(p => ({ id: p._id || p.id, name: p.name, description: p.description, date: new Date(p.updatedAt || p.createdAt).toLocaleDateString() })));
      } catch {}
      try {
        const f = await checkinAPI.getFeed();
        setFeed(f.map(c => ({ user: c.user?.username || "", project: c.project?.name || "", date: new Date(c.createdAt).toLocaleDateString(), userId: c.user?._id, projectId: c.project?._id })));
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <SearchBar />
      </div>

      <section className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="card-list">
          {feed.map((p, index) => (
            <FeedItem key={index} item={p} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Trending Projects</h2>
        <div className="card-list">
          {trending.map((p, id) => (
            <Link key={id} to={`/project/${p.id}`} className="project-card-link">
              <div className="card">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <small>{p.date}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
