// Amadeus Fidos u22526162
import React from "react";
import { Link } from "react-router-dom";
import "../styles/feedItem.css";
export default function FeedItem({ item }) {
  return (
    <div className="feed-item">
      <p>
        <Link to={`/profile/${item.userId}`}>{item.user}</Link> 
        <Link to={`/project/${item.projectId}`}>{item.project}</Link>
      </p>
      <small>{item.date}</small>
    </div>
  );
}
