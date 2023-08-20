// components/Image.js
import React from 'react';

const Image = ({ imageUrl, altText }) => {
  return <img src={imageUrl} alt={altText} style={{ maxWidth: '100%' }} className='tweet-img'/>;
};

export default Image;
