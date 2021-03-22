const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username : String,
    googleID : String
});

const userModel = mongoose.model('userModel',user);
module.exports={
    userModel
}