import React from 'react';
import { useParams } from 'react-router-dom';
import Blog from './Blog';

const BlogWrapper = ({ profiles }) => {
  const { id } = useParams();
  const profileId = parseInt(id, 10);
  const profile = profiles.find((profile) => profile.id === profileId);

  if (!profile) {
    return <div>Profile Not Found</div>;
  }

  return <Blog profile={profile} />;
};

export default BlogWrapper;
