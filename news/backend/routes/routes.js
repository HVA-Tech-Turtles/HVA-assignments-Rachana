const express = require('express');
const Article = require('../models/articles');
const router = express.Router()

//Post Method
router.post('/post',async (req, res) => {
    const data = new Model({
        heading: req.body.heading,
        image: req.body.image,
        info: req.body.info
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        // Fetch all news articles from MongoDB
        const articles = await Article.find();
    
        // Send the articles as a response to the frontend
        res.json(articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Server error' });
      }
})
module.exports = router;