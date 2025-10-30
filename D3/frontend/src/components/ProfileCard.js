// Amadeus Fidos u22526162
function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
      <h2 className="name">{user.name}</h2>
      <div className="bio-div">
        <p className="bio">{user.bio}</p>
      </div>
    </div>
  );
}

export default ProfileCard;