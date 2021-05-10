const path = require('path');
const express = require('express');
const router = require('./routes/router.js');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');

app.use(
    session({
        secret: '777',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(router);

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}...`);
});
