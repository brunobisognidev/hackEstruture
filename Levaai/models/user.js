const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check 

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
   },

   email:{
      type: String,
      trim: true,
      required: true,
      unique: true
   },
   hashed_password:{
      type: String,
      required: true,
      
   },
   about:{
      type: String,
      trim: true,
      
   }, 

   salt: String,
   role: {
      type : Number,
      default:0

   }, 
   history:{
      type: Array,
      default:[]
   },

 },
 {timestamps: true}
);

//virtual fields

userSchema.virtual('password')
.set(function(password){
   this._password = password
   this.salt = uuidv1()
   this.hashed_password= this.encryptPassword(password)
})
.get(function(){
   return this.password
});




userSchema.methods = {
      encryptPassword: function(password){
         if(!password) return '';
         try{
            return crypto.createHmac('sha1', this.salt)
                                 .update(password)
                                 .digest('hex')
         } catch(err){
            return"";
         }
         }
      };
      module.exports = mongoose.model("User", userSchema);

