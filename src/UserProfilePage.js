import React, { useEffect, useState } from 'react';
import { getUserProfileByUsername } from './apiService';
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfileByUsername(username);
        setUser(userData);
      } catch (error) {
        setError('Failed to fetch user profile. Please try again.');
      }
    };

    fetchUserProfile();
  }, [username]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-picture">
        {user.profilePic && <img src={user.profilePic} alt="Profile" />}
      </div>
      <div className="user-profile-info">
        <h1>{user.username}</h1>
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
