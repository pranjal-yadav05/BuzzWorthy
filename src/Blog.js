import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import blogs from './blogs';
import './Blog.css'

function Blog({ profile }) {
  const filteredBlogs = blogs.filter((blog) => blog.author === profile.Name);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4" align="center" gutterBottom>
          {profile.Name}'s Blog
        </Typography>
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.date}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ marginBottom: '20px' }}
          >
            <Paper className='blogpost' elevation={3} style={{ padding: '20px'}}>
              <Typography variant="h5" gutterBottom>
                {blog.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {blog.content}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Date: {blog.date}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Grid>
    </Grid>
  );
}

export default Blog;
