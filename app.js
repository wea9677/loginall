require("dotenv").config();
const express = require('express');
const mariadb = require('mariadb');
// const passport = require('passport');/
const passportConfig = require('./passport/passport');
const UserRouter = require('./routes/userRouter');
const port = process.env.PORT
const app = express();

passportConfig()
app.use(express.json());




app.get('/', (req, res) =>{
    res.status(200).render('index');
});


app.use('/auth', UserRouter);
app.set("view engine", "ejs");







app.listen(port, ()=>{
    console.log(port,"번 포트가 열렸습니다.")
});