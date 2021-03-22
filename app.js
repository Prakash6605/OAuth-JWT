const express = require('express');
const {mongoose} = require('./databaseConfig/dbConnection');
const {router} = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middlewareForJWT/authMiddleware');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine' , 'ejs');

app.get('/',(req,res)=>{
    res.render('home');
})


// /smooties is being protected by the jwt web token
app.get('/smoothies',requireAuth,(req,res)=>{
    res.render('smoothies');
})
// * will apply to every route
app.get('*',checkUser);
app.use(router);


// understanding cookies
// app.get('/set-cookies',(req,res)=>{
//      res.cookie('newUser', false);
//      res.cookie('isEmployees',true,{maxAge:1000*60*60*24});
//      res.send('cookie set');
// })

// app.get('/read-cookies',(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// })





app.listen(5000,(req,res)=>{
    console.log('http://localhost:5000');
})