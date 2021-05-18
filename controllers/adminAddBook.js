const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = (req, res) => {
    if (req.session.email === admin.email) {
        const Books = mongo.db('library').collection('Books');
        try {
            let book = req.body;
            book.image = req.file.filename;
            book.popularity = 0;
            book.available = true;
            Books.insertOne(book);
            res.render('adminAddBook', {
                tabpage: 'addbook',
                active: 'user',
                formProcessed: true,
                session: req.session.email,
            });
        } catch (error) {
            console.log(error);
            res.render('message', {
                title: 'Меню администратора',
                status: 'Ошибка базы данных',
                color: 'text-danger',
                active: 'user',
                session: req.session.email,
            });
        }
    } else {
        res.redirect('/');
    }
};
