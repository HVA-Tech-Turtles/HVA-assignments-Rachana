// src/News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAll');
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className='weather-top'>
      <ul className='tweet'>
        {newsData.map((article) => (
          <li key={article._id} >
            <div className='tweet-container'>
            <div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img  className='tweet-img' src={article.urlToImage} alt={article.title} style={{ maxWidth: '100%' }} />
            </a>
            </div>
            <div>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>Published At: {article.publishedAt}</p>
            </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
