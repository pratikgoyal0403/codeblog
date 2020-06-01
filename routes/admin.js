const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

router.get('/myposts', adminController.getAdminPosts);

router.get("/new-post", adminController.getNewBlogPage);
router.post("/new-post", adminController.postNewBlog);

router.get('/edit-post/:productId', adminController.getEditPage);
router.post('/myposts', adminController.postAdminPosts);
router.get('/delete-post/:postId', adminController.deletePost);
module.exports = router;