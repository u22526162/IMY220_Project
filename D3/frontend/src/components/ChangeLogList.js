// Amadeus Fidos u22526162
import React from "react";

export default function ChangeLogList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="project-detail-changelog-list">
      {items.map((item, idx) => (
        <li key={idx} className="project-detail-changelog-item">
          {item.version && <span className="changelog-version">{item.version}</span>}
          <span className="changelog-note">{item.note || item.message}</span>
          {item.date && <small className="checkin-meta" style={{ marginLeft: 8 }}>{item.date}</small>}
        </li>
      ))}
    </ul>
  );
}
