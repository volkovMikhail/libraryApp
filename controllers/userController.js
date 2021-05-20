const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    const Books = mongo.db('library').collection('Books');
    if (admin.email === req.session.email) {
        res.redirect('/admin/books');
    } else {
        if (req.session.email == undefined) {
            res.redirect('/login');
        } else {
            let user;
            try {
                user = await Users.find({ email: req.session.email }).toArray();
                res.render('user', {
                    title: 'Личный кабинет',
                    active: 'user',
                    user: user[0],
                    session: req.session.email,
                    isAdmin: false,
                });
            } catch (error) {
                res.render('message', {
                    title: 'Личный кабинет',
                    color: 'text-dark',
                    status: 'Вам необходимо войти в учётную запись',
                    active: 'login',
                    session: req.session.email,
                });
                return;
            }
        }
    }
};
