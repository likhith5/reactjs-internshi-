// src/components/UserProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams(); // Retrieve the dynamic part of the URL

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p>Welcome, {username}likhithhk23!</p>
    </div>
  );
};

export default UserProfile;
