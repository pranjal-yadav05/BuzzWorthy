import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';

function List({ profiles }) {
  const navigate = useNavigate();

  const handleSelectProfile = (profile) => {
    navigate(`/blog/${profile.id}`);
  };

  const containerStyle = {
    margin: "40px",
    display: "flex"
  };
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={containerStyle}>
      <AnimatePresence>
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <ListItem profile={profile} onSelectProfile={handleSelectProfile} />
          </motion.div>
        ))}
      </AnimatePresence>
      {profiles.length === 0 && (
        <Typography variant="h6" align="center">
          No Profiles
        </Typography>
      )}
    </div>
  );

}

export default List;
