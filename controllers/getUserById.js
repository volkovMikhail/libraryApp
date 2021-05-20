const mongo = require('../models/db');
const admin = require('../models/admin');
const { ObjectID } = require('bson');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    const Books = mongo.db('library').collection('Books');
    if (admin.email === req.session.email) {
        try {
            user = await Users.find({ _id: ObjectID(req.params.id) }).toArray();
            const books = [];
            if (user[0].hasOwnProperty('books')) {
                for (const e of user[0].books) {
                    let book = await Books.find({
                        _id: ObjectID(e.id),
                    }).toArray();
                    books.push({ book: book[0], orderDate: e.orderDate });
                }
            }
            res.render('user', {
                title: 'Личный кабинет',
                active: 'user',
                user: user[0],
                books: books,
                session: req.session.email,
                isAdmin: true,
            });
        } catch (error) {
            res.render('message', {
                title: 'Ошибка',
                color: 'text-danger',
                status: error.toString(),
                active: 'login',
                session: req.session.email,
            });
            return;
        }
    } else {
        res.redirect('/');
    }
};
