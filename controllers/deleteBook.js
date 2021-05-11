const mongo = require('../models/db');

module.exports = async (req, res) => {
    const Users = mongo.db('library').collection('Users');
    if (req.session.email == undefined) {
        res.render('message', {
            title: '404',
            color: 'text-dark',
            status: '404',
            active: 'login',
        });
    } else {
        let user = await Users.findOne({email:req.session.email});
        for (let i = 0; i < user.books.length; i++) {
            if(req.params.id == user.books[i].id){
                user.books.splice(i,1);
            }
        }
        Users.updateOne({email:req.session.email},{$set:user});
        res.redirect('/user');
    }
};
