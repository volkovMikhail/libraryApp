const mongo = require('../models/db');
const md5 = require('md5');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    const user = await Users.find({
        email: req.body.email,
        password: md5(req.body.password),
    }).toArray();
    if (user.length === 0) {
        res.render('message', {
            title: 'Вход',
            color: 'text-dark',
            status: 'Пользователь не найден...',
            active: 'login',
            session: req.session.email
        });
    } else {
        req.session.email = user[0].email;
        res.redirect('/user');
    }
};
