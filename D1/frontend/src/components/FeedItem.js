import React from "react";
import { Link } from "react-router-dom";

export default function FeedItem({ item }) {
  return (
    <div className="feed-item">
      <p>
        <Link to={`/profile/${item.userId}`}>{item.userName}</Link> 
        <Link to={`/project/${item.projectId}`}>{item.projectName}</Link>
      </p>
      <small>{item.date}</small>
    </div>
  );
}
