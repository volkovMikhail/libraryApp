module.exports = (req, res) => {
    if (!req.session.email) {
        res.render("reg", {
            active: "registration",
            session: req.session.email,
        });
    } else {
        res.redirect("/");
    }
};
