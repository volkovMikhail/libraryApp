const { ObjectId } = require('bson');
const mongo = require('../models/db');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    const Books = mongo.db('library').collection('Books');
    if (req.session.email == undefined) {
        res.render('message', {
            title: 'Личный кабинет',
            color: 'text-dark',
            status: 'Вам необходимо войти в учётную запись',
            active: 'login',
            session: req.session.email
        });
    } else {
        let user;
        try {
            user = await Users.find({ email: req.session.email }).toArray();
            const books = [];
            if (user[0].hasOwnProperty('books')) {
                for (const e of user[0].books) {
                    let book = await Books.find({ _id: ObjectId(e.id) }).toArray();
                    books.push({ book: book[0], orderDate: e.orderDate });
                }
            }
            res.render('user', {
                title: 'Личный кабинет',
                active: 'user',
                user: user[0],
                books: books,
                session: req.session.email
            });
        } catch (error) {
            res.render('message', {
                title: 'Личный кабинет',
                color: 'text-dark',
                status: 'Вам необходимо войти в учётную запись',
                active: 'login',
                session: req.session.email
            });
            return;
        }
    }
};
