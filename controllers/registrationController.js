const mongo = require('../models/db');
const md5 = require('md5');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    let user = req.body;
    user.regDate = new Date().toLocaleString();
    user.password = md5(user.password);
    let checkUser = await Users.find({ email: user.email }).toArray();
    if (checkUser.length === 0) {
        res.render('message', {
            title: 'Регистрация',
            status: 'Успех! Регистрация завершена!',
            color: 'text-success',
            active: 'registration',
        });
        Users.insertOne(user);
    } else {
        res.render('message', {
            title: 'Регистрация',
            status: 'Данный Email уже используется.',
            color: 'text-danger',
            active: 'registration',
        });
    }
};
