const mongo = require('../models/db');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books')    
    const books = await Books.find({}).toArray();
    res.json(books)
};