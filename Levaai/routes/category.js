const express = require("express");
const router = express.Router(); 

const { create, categoryById, update , remove , list }= require("../controller/category");
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");

router.post(
   "/category/create/:userId",
   requireSignin,
   isAuth,
   isAdmin,
   create
);

router.put(
   "/category/:categoryId/userId", 
requireSignin,
isAdmin,
isAuth,
update
);

router.delete(
   "/category/:categoryId/:userId",
requireSignin,
isAuth,
isAdmin,
remove
);

router.get("/categories", list);
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router