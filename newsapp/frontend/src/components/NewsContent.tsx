// components/NewsContent.js
import React from 'react';

const NewsContent = ({ description, publishedAt, url }) => {
  return (
    <div className='content'>
      <p>{description}</p>
      <p>Published At: {new Date(publishedAt).toLocaleString()}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default NewsContent;
