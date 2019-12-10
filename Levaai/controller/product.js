const formidable = require("formidable");
const _ = require ("lodash");
const fs = require ('fs');
const Product = require ("../models/product");
const { errorHandler } = require ("../helpers/dbErrorHandler")

exports.productById = (req, res,next, id) => {
   Product.findById(id).exec((err, product) =>{
      if(err || !product) {
         return res.status(400).json({
            error: "Product not found"
         });
      };

      req.product = product;
      next();
   });
};

exports.read = (req, res) => {
   req.product.photo = undefined;
   return res.json(req.product);
};



exports.create = (req, res) => {
   let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
      if(err) {
         return res.status(400).json({
            error: "Image cold not be uploaded"
         })
      }
      let product = Product(fields)
      if (files.photo) {
         console.log("FILES PHOTO", files.photo);
         if (files.photo.size > 100000){
            return res.status(400).json({
               error: "Image should be less than 1mb in size"
            });

            // verifica os campos se foram preechidos 

            const 
            {name, 
            description , 
            price , 
            category, 
            quantity , 
            shipping 
         } = fields

            if
            (!name||
             !description ||
             !price ||
             !category || 
             !quantity || 
             !shipping
             ) {
               return res.status(400).json({
                  error: " All fields are required"
               })
            }

         }
         product.photo.data = fs.readFilesSync(file.photo.path)
         product.photo.contentType =files.photo.type
      }

      product.save((err, result) => {
         if(err) {
            return res.status(400).json({
               error: errorHandler(error)
            });
            res.json(result);
         }
      })
   })
}