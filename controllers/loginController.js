module.exports = (req, res) => {
    if (req.session.email == undefined) {
        res.render('login', { active: 'login', session: req.session.email });
    } else {
        res.redirect('/');
    }
};
