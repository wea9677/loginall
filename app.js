require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const config = fs.readFileSync('./config/config.json');
const AppleAuth = require('apple-auth');
const mariadb = require('mariadb');
const passport = require('passport');
const passportConfig = require('./passport/passport');
const UserRouter = require('./routes/userRouter');
// const sequelize = require('./database/db');
const port = process.env.PORT || 3000
const app = express();
const session = require('express-session');
// sequelize.sync();

passportConfig()
app.use(express.json());


mongoose.connect('mongodb+srv://wea9677:tmxkdlfl@cluster0.xmzro.mongodb.net/loginall'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// //mariadb

// const db = require('./model');
// db.sequelize
// .sync()
// .then(() =>{
//     console.log('mariadb연결 성공')
// })
// .catch((error) =>{
//     console.error(error);
// });


const auth = new AppleAuth(config, fs.readFileSync('./config/AuthKey_P7344SBK66.p8'))
app.get('/', (req, res) =>{
    res.send(`<a href="${auth.loginURL()}">Sign in with Apple</a>`);
});

app.get('/login',  (req, res) =>{
    res.status(200).render('index');
})
app.use(session({ 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/oauth', express.urlencoded({ extended: false }), UserRouter);


app.set("view engine", "ejs");







app.listen(port, ()=>{
    console.log(`${port}로 서버가 열렸습니다.`)
});