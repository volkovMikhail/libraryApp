const { ObjectID } = require('bson');
const mongo = require('../models/db');

module.exports = async (req, res) => {
    const User = mongo.db('library').collection('Users');
    const Books = mongo.db('library').collection('Books');
    const book = await Books.findOne({ _id: ObjectID(req.params.id) });
    if (!book.available) {
        res.render('message', {
            title: book.name,
            color: 'text-dark',
            status: 'Приносим извинения, книги нет в наличии',
            active: 'book',
            session: req.session.email,
        });
        return;
    }
    if (req.session.email == undefined) {
        res.redirect('/login');
    } else {
        try {
            const newPopularity = parseInt(book.popularity,10)  + 10;
            Books.updateOne(
                { _id: ObjectID(req.params.id) },
                {
                    $set: {
                        popularity: newPopularity,
                    },
                }
            );
            User.updateOne(
                { email: req.session.email },
                {
                    $push: {
                        books: {
                            id: ObjectID(req.params.id),
                            orderDate: new Date().toLocaleDateString(),
                        },
                    },
                }
            );
            res.redirect('/user');
            return;
        } catch (error) {
            console.log(error);
            res.render('message', {
                title: 'Книга',
                color: 'text-dark',
                status: '404 Книга не найдена',
                active: 'book',
                session: req.session.email,
            });
            return;
        }
    }
};
