const { ObjectID } = require('bson');
const mongo = require('../models/db');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books');
    let book;
    try {
        book = await Books.find({ _id: ObjectID(req.params.id) }).toArray();
    } catch (e) {
        res.render('message', {
            title: 'Книга',
            color: 'text-dark',
            status: '404 Книга не найдена',
            active: 'book',
        });
        return;
    }
    if (book.length === 0) {
        res.render('message', {
            title: 'Книга',
            color: 'text-dark',
            status: '404 Книга не найдена',
            active: 'book',
        });
    }else{
        res.render('book', {
            active: 'book',
            book: book[0],
        });
    }
};
