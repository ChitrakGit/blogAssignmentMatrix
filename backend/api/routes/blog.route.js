const express =  require("express");
const {getBlogs, addBlog, deleteBlog, editBlog, addComment} = require("../controllers/blogs.controller");
const {userValidate} = require("../middlewares/userValidate")
const router = express.Router();

router.route("/get-blog").get(userValidate,getBlogs);

router.route("/add-blog").post( userValidate ,addBlog);
router.route("/add-comment").post( userValidate ,addComment);

router.route("/edit-blog").put( userValidate ,editBlog);

router.route("/delete-blog").delete( userValidate ,deleteBlog);



module.exports = router;