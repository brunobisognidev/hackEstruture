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
            {
             name, 
            description , 
            price , 
            category, 
            quantity , 
            shipping 
         } = fields

            if
            (
               !name||
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

      products.save((err, result) => {
         if(err) {
            console.log (err, result)
            return res.status(400).json (err.message )
            res.json(result);
         }
      });
   });
};

exports.remove = (req, res) => {
   let product = req.product 
   product.remove((err, deletedProduct) => {
      if(err) {
         return res.status(400).json({
            error: errorHandler(err)
         });
      }
      res.json({
         deletedProduct,
         message: "Product deleted succesfully"
      }); 
   })
}

exports.update =(req, res) => {
   let form = new formidable.IncomingForm()
      form.keepExtensions = true;
      form.parse(req, (err, field, file) => {
         if(err) {
            return res.status(400).json({
               erro:"Image could not be uploaded"
            }); 
         }
            const {

               name,
               description,
               price,
               category,
               quantity,
               shipping,
            } = fields;

            if (

               !name ||
               !description||
               !price ||
               !category || 
               !quantity || 
               !shipping

            ) {

                  return res.status(400).json({
                     erro:"All fields are required"
                  });
            };

            let product = req.product
            product = _.extend(product, fields)

            // 1kb = 1000 
            // 1mb = 1000000

            if (file.photo){
               if (files.photo.size > 1000000){
                  return res.status(400).json({
                     error : "Image should be less than 1mb in size"
                  });
               }
               product.photo.data = fs.readFileSync(file.photo.path);
               product.photo.contentType = files.photo.type
            }
            product.save((err, result) => {
               if (err) {
                  return res.status(400).json({
                     erro: errorHandler(err)
                  });
               }
               res.json(result);
            })

      });

   exports.list = (req, res) => {
      let order = req.query.order ? req.query.order : 'asc'
      let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
      let limit =  req.query.limit ? parseInt  (req.query.limit) : 8

      Product.find()
         .select("-photo")
         .populate("category")
         .sort([[sortBy, order]])
         .limit((limit))
         .exec((err,product) => {
            if(err) {
               return res.status(400).json({
                  error: 'Product not found'
               })
            }

            res.send(product)
         });
   };

   exports.listRelated = (req, res) =>{
      let limit = req.query.limit ? parseInt(req.query.limit) :6;

      Product.find({_id: {$ne: req.product}, category: req.product.category})
      .limit(limit)
      .populate('category', '_id name')
      .exec((err, product) =>{
         if (err) {
            return res.status(400).json({
               error: "Products not found"
            });
         }

         res.json(product)
      });
   };
   exports.listCategories = (req, res) => {
      Product.distinct("category"{}, (err, product) => {
         if (err) {
            return res.status(400).json({
               error: "Categories not found"
            });
         }
         res.json(categories);
      });
   };

   exports.listBySearch = (req, res) => {
      let order = req.body.order ? req.body.order : "desc";
      let sortBy =  req.body.sortBy ?  req.body.sortBy : "_id"; 
      let limit = req.body.limit ? parseInt (req.body.limit) : 100;
      let skip = parseInt (req.body.skip);
      let findArgs = {};

      for (let key in req.body.filters) {
         if (req.body.filters[key].lengh > 0 ) {
            if (key === "price") {
               findArgs[key] = {
                  $gte: req.body.filter[key][0],
                  $lte: req.body.filter[key][1]
               };
            }else }
            findArgs [key] = req.body.filters[key]; 
      }
   }
product.find(findArgs)
.select("-photo")
.populate("category")
.sort([[sortBy, order]])
.skip(skip)
.limit(limit)
.exec((err, data) => {
   if (err) {
      return res.status(400).json({
            error: "Products not found"
      });
   }
   res.json({
      size: data.length,
      data

   });
});

};
   
exports.photo = (req, res, next) => {
   if (req.product.photo.data) {
      res.set('Content-Type', req.product.photo.contentType)
      return res.send(req.product.photo.data)
   }

   next();
}



