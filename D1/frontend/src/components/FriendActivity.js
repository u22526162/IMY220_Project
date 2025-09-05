import React from "react";

function FriendActivity({ activity }) {
  return (
    <div className="friend-activity">
      <p>
        {activity.user} created a project <b>{activity.project}</b>
      </p>
    </div>
  );
}

export default FriendActivity;