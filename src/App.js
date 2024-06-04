import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import List from './List';
import BlogWrapper from './BlogWrapper';
import Home from './Home';
import blogs from './blogs';

function App() {
  const profiles = [
    { id: 1, Name: "Pranjal", Gender: "Male" },
    { id: 2, Name: "Megh", Gender: "Male" },
    { id: 3, Name: "Shaily", Gender: "Female" },
    { id: 4, Name: "Smit", Gender: "Male" },
  ];

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
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;