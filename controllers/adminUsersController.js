const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    if (req.session.email === admin.email) {
        const users = await mongo
            .db('library')
            .collection('Users')
            .find({})
            .toArray();
        for (let i = 0, endI = users.length - 1; i < endI; i++) {
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                if (users[j].hasOwnProperty('books') && users[j+1].hasOwnProperty('books')) {
                    if (users[j].books.length < users[j + 1].books.length) {
                        let swap = users[j];
                        users[j] = users[j + 1];
                        users[j + 1] = swap;
                    }
                }else if (!users[j].hasOwnProperty('books') && users[j+1].hasOwnProperty('books')) {
                    let swap = users[j];
                    users[j] = users[j + 1];
                    users[j + 1] = swap;
                }
            }
        }
        res.render('adminUsers', {
            tabpage: 'users',
            active: 'user',
            users: users,
            session: req.session.email,
        });
    } else {
        res.redirect('/');
    }
};
