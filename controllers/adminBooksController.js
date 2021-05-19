const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books');
    if (req.session.email === admin.email) {
        const books = await Books.find({}).toArray();
        res.render('adminBooks', {
            tabpage: 'books',
            active: 'user',
            session: req.session.email,
            books,
        });
    } else {
        res.redirect('/');
    }
};
