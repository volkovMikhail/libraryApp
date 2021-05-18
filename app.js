const path = require('path');
const express = require('express');
const router = require('./routes/router.js');
const session = require('express-session');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().getTime().toString() + path.extname(file.originalname)
        ); //Appending extension
    },
});

const upload = multer({ storage: storage });
app.use(upload.single('image'));
app.use(
    session({
        secret: '1337',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(router);
app.get('*', (req, res) => {
    res.render('message', {
        title: '404',
        color: 'text-dark',
        status: '404 Not found',
        active: 'Error',
    });
});

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}...`);
});
