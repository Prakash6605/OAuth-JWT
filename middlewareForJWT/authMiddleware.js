const jwt = require('jsonwebtoken');
const {userModel} = require('../models/User');


// since this is a middleware we will have the access to the req and res object
const requireAuth = function(req,res,next){
    // grading the token
    const token = req.cookies.jwt;

    // check whether jwt it exists or not
    if(token){
         jwt.verify(token, 'secret key which is used to hash the header and paylod',(err,decodedToken)=>{
             if(err){
                 console.log(err);
                 res.redirect('/login');
             }
             else{
                 console.log(decodedToken);
                 next();
             }
         });
    }
    else{
        res.redirect('/login');
    }

}
// check current user
const checkUser = async (req,res,next)=>{
    const token = req.cookie.jwt;
    if(token){
       // verify the token
       jwt.verify(token, 'secret key which is used to hash the header and paylod', (err, decodedToken) => {
           if (err) {
               console.log(err);
               res.local.user=null;
               next();
           } else {
               console.log(decodedToken);
               let user = await userModel.findById(decodedToken.id);
               res.locals.user = user
               // we know that user is a valid user , so getting the email and displaying in the header
               next();
           }
       });
    }
    else{
        res.locals.user=null;
    }
}
module.exports={
    requireAuth,checkUser
}