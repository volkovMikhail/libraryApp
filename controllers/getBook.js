const { ObjectID } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books');
    const Users = mongo.db('library').collection('Users');
    let users;
    let isAdmin;
    if (req.session.email === admin.email) {
        users = await Users.find(
            { 'books.id': ObjectID(req.params.id) },
            { 'books.$': 1 }
        ).toArray();
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users[i].books.length; j++) {
                if (users[i].books[j].id == req.params.id) {
                    users[i].orderDate = users[i].books[j].orderDate;
                }
            }
        }
        isAdmin = true;
    } else {
        users = [];
        isAdmin = false;
    }

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
            users: users,
            session: req.session.email,
            isAdmin: isAdmin,
        });
    }
};
