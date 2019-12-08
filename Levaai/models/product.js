const mongoose = require ("mongoose");
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
{
   name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
   },
   description : {
      type: String,
      required: true,
      maxlength: 2000
   },
   price: {

      type: String,
      required: true,
      maxlength: 32
      
   },

   category : {
      type: ObjectId,
      ref:'Category',
      required: true
   }, 

   photo:{
      data:buffer,
      contentType:Spring
   },
   shipping:{
      required: false,
      type: Boolean
   }

 
   },
   {timestamps: true}


);

module.exports = mongoose.model("Product", productSchema);