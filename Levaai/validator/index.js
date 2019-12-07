exports.userSignupValidator = (req, res) => {
   req.check("name", "Name is required").notEmpty();
   req.check("email", "Email must be between 3 to 32 characteres")
      .matches(/.+\@.+\..+/)
      .withMassage("Email must contain @")
      .isLength({
         min:4,
         max: 32
      }); 

      req.check("Password must contain at least 6 characters")
      req.check("password")
      .isLength({min: 6})
      .withMessage("Password must contain at least 6 caracters")
      .matches(/\d/)
      .withMassage("Password must contain a number");
      const errors = req.validationErrors();
         if(errors){
            const firstError = errors.map(error => message)[0];
            return res.status(400).json({error:firstError});
         }
         next();
};



