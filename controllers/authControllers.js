const {userModel} = require('../models/User');
const jwt = require('jsonwebtoken');

// creating token
// id the user_id that mongodb gives to the user
const maxAge = 3*24*60*60;
const createtoken = (id)=>{
     return jwt.sign({id},'secret key which is used to hash the header and paylod',{
         expiresIn : maxAge//its axcept in sec not in millisec like cookie
     })
}

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.logout_get = (req,res)=>{
    // here we are updating the jwt with the empty string , which will event fail when the authMiddleware.js ke inside jo function hai wo run hoga , and sath hi sath hmlog cookie ka life bhi bhut chotta kr deynge
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');// redirecting the user to home page
}
module.exports.signup_post = async (req, res) => {
    const {email,password} = req.body;
    try{
        const new_user =await userModel.create({email,password});

        // creating a jwt
        const token = createtoken(new_user._id);
        // creating the cookie with name jwt 
        res.cookie('jwt',token,{maxAge:maxAge*1000});

        res.status(201).json({
            new_user : new_user._id
        });
    }catch(err){
        console.log(err);
        // const errors = handleErrors(err);
        res.status(400).send(`User not created pls check that you are entering the valid email and password`);
    }
    // res.send('new signup');
}
module.exports.login_post = async (req, res) => {
    const {email,password} = req.body;
    try{
       const user = await userModel.login(email,apssword);

       if(user){
           // creating a jwt for the user
                   // creating a jwt
                   const token = createtoken(new_user._id);
                   // creating the cookie with name jwt 
                   res.cookie('jwt', token, {
                       maxAge: maxAge * 1000
                   });
                   res.status(201).json({
                       new_user: new_user._id
                   });

       }
    }catch(err){
        res.status(400).send('email or password is incorrect');
    }
    // res.send('new login');
}
