import React, { useState, useEffect } from 'react';
import { updateProfile, getCurrentUserProfile, checkUsernameAvailability} from './apiService';
import { jwtDecode } from 'jwt-decode';
import './MyProfilePage.css'

const MyProfilePage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const profile = await getCurrentUserProfile(decodedToken.userId);
        setCurrentUsername(decodedToken.username);
        if (profile) {
        //   setUsername(profile.username || '');
          setName(profile.name || '');
          // Set the profile picture URL if available
          if (profile.profileImage) {
            
            setProfilePic(profile.profileImage);
          }
        } else {
          setError('Profile not found.');
        }
      } catch (error) {
        setError('Failed to fetch profile. Please try again.');
      }
    };
  
    fetchProfile();
  }, []);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Only image files are allowed.');
      }
    } else {
      setProfilePic(null);
    }
  };

  const handleUpdateProfile = async () => {
    let res;
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const userData = {
        userId,
        username,
        name,
        profilePic,
      };

      res = await updateProfile(userData);
      setError(res.message)
      // Profile updated successfully
    } catch (error) {
      setError(error)
    }
  };
  

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername) {
      try {
        const { available } = await checkUsernameAvailability(newUsername);
        if (!available) {
          setError('Username is already taken');
        } else {
          setError('');
        }
      } catch (error) {
        setError('Error checking username availability');
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        {/* Display profile picture here */}
        { (profilePic) ? ( <img className='outsidepic' style={{width:'40%'}} src={profilePic} alt="profile" />):(<>No Profile Pic to Show</>)}
       
      </div>
      <div className="profile-form">
        <div className='divIn'>
        <h1>My Profile</h1>
        <img className='insidepic' src={profilePic} alt="Profile" />
        
        {error && <div className="error">{error}</div>}
        <label className='below'>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            onChange={handleFileChange} 
          />
        </label>
        <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
