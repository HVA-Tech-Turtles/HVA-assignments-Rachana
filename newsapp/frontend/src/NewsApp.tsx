// NewsApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from './components/Heading';
import Image from './components/Image';
import NewsContent from './components/NewsContent';
import './styles.css';

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('sports');

  useEffect(() => {
    fetchNewsByCategory(activeCategory);
  }, [activeCategory]);

  const fetchNewsByCategory = (category:string) => {
    axios.get(`http://localhost:5000/api/news/${category}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  };

  return (
    <div>
      <nav id="navbar">
        <ul className='nav-items'>
          <li>
            <button onClick={() => setActiveCategory('health')}>Health</button>
          </li>
          <li>
            <button onClick={() => setActiveCategory('technology')}>Technology</button>
          </li>
          <li>
            <button onClick={() => setActiveCategory('business')}>Business</button>
          </li>
          <li>
            <button onClick={() => setActiveCategory('sports')}>Sports</button>
          </li>
          <li>
            <button onClick={() => setActiveCategory('entertainment')}>Entertainment</button>
          </li>
        </ul>
      </nav>
      <h1>Top Headlines - {activeCategory}</h1>
      {articles.map(article => (
        <div key={article.title} className='tweet'>
          <Heading title={article.title} />
          <div className='tweet-container'>
           <div> 
          <Image imageUrl={article.urlToImage} altText={article.title} />
          </div>
          <div>
          <NewsContent
            description={article.description}
            publishedAt={article.publishedAt}
            url={article.url}
          />
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsApp;
