import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import List from './List';
import BlogWrapper from './BlogWrapper';
import Home from './Home';
import blogs from './blogs';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import MyProfilePage from './MyProfilePage';
import UserProfilePage from './UserProfilePage';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtering profiles based on the search query
    const filtered = profiles.filter((profile) =>
      profile.Name.toLowerCase().includes(query)
    );
    setFilteredProfiles(filtered);
  };

  return (
      <Router>
        <div className="App">
          {/* Passing searchQuery and handleSearchChange to the Header */}
          <Header onSearchChange={handleSearchChange} searchQuery={searchQuery} />

          <Routes>
            <Route exact path="/" element={<Home blogs={blogs} searchQuery={searchQuery} />} />
            <Route path="/blog/:id" element={<BlogWrapper profiles={profiles} />} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>404 Not Found</div>} />
            {/* <Route path="/my-profile" element={<MyProfilePage/>} /> */}
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute>
                  <MyProfilePage/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:username"
              element={
                <ProtectedRoute>
                  <UserProfilePage/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
