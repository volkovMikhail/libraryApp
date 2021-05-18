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
            session: req.session.email,
        });
        return;
    }
    if (book.length === 0) {
        res.render('message', {
            title: 'Книга',
            color: 'text-dark',
            status: '404 Книга не найдена',
            active: 'book',
            session: req.session.email,
        });
    } else {
        const newPopularity = parseInt(book[0].popularity, 10) + 1;
        Books.updateOne(
            { _id: ObjectID(req.params.id) },
            {
                $set: {
                    popularity: newPopularity,
                },
            }
        );
        res.render('book', {
            active: 'book',
            book: book[0],
            session: req.session.email,
        });
    }
};
