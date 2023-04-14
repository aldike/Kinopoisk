const express = require('express');
const session = require('express-session');
const mongooseStore = require('connect-mongo')

const app = express();

require('./server/config/db')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(session(){
    name: 'kinopoisk.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017'
    })
})
app.set("view engine", "ejs");

app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))
app.use(require('./server/auth/router'))


const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is listening to Port ${PORT}`);
});

