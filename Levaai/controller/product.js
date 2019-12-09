const formidable = require("formidable");
const _ = require ("lodash");
const fs = require ('fs');
const Product = require ("../models/product");

exports.create = (req, res) => {
   let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req, (err, field, files) => {
      if(err) {
         return res.status(400).json({
            error: "Image cold not be uploaded"
         })
      }
      let product = new product(field)
      if (files.photo) {
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