import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="profile-container">
      <div className="photo-container">
        <img src={user.photo} alt="" />
      </div>
      <div className="details-container">
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
      </div>
    </div>
  );
};

export default Profile;
