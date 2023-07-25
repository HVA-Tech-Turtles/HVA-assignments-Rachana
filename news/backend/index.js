//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
//const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

const Article = require('./models/articles');

mongoose.connect('mongodb://127.0.0.1:27017/newsdb');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

  
  // Fetch news data from NewsAPI.org
  async function fetchNews() {
    const apiKey = "e7182fcf3def4f1ea8e2ef99cdaece92";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'ok') {
        saveToDatabase(data.articles);
      } else {
        console.error('Error fetching news:', data.message);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
  
  // Save fetched news data to the database
  function saveToDatabase(articles) {
    articles.forEach(article => {
      const newArticle = new Article({
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        url: article.url,
        urlToImage: article.urlToImage,
      });
  
    newArticle.save();
    });
  }
  
  // Run the fetchNews function to populate the database on server startup
  fetchNews();



app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})

app.use('/api', routes);


