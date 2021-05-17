const mongo = require('../models/db');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books');
    const books = await Books.find({}).toArray();
    res.render('catalog', {
        title: 'Каталог',
        active: 'catalog',
        books: books,
        session: req.session.email
    });
};
