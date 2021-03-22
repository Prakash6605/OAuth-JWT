const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : [true,'Please enter an email'] ,
        unique : true ,
        lowercase : true,
        validate : [(val)=>{
            // validating the email field
            // val is the email itself here
            isEmail
        },'Please enter a valid email']   
        },
    password : {
      type: String,
          required: [true,'Please enter the password'],
          minlength :[ 6,'Min password length is 6 ']
    }
})
// static method to login user
userSchema.static.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        if(user.password === password){
            return user;
        }
        else{
            throw Error('incorrect password');
        }
    }
    throw Error('incorrect email');
}
const userModel = mongoose.model('userTable',userSchema);
module.exports={
    userModel
}