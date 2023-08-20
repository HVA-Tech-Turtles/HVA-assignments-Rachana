//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
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

// Fetch news data from NewsAPI.org and save to the database
async function fetchAndSaveNews(category) {
  const apiKey = "e7182fcf3def4f1ea8e2ef99cdaece92";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'ok') {
      saveToDatabase(data.articles, category);
    } else {
      console.error('Error fetching news:', data.message);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}
  // Save fetched news data to the database
  function saveToDatabase(articles, category) {
    articles.forEach(article => {
      const newArticle = new Article({
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        url: article.url,
        urlToImage: article.urlToImage,
        category: category,
      });
  
      newArticle.save();
    });
  }
  
  // Run the fetchNews function to populate the database on server startup
  // const categoriesToFetch = ['health', 'technology', 'business', 'sports', 'entertainment'];
  // categoriesToFetch.forEach(category => {
  //   fetchAndSaveNews(category);
  // });



app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

app.use('/api', routes);


