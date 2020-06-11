const express = require('express');

const adminController = require('../controller/admin');
const routeAuth = require('../middleware/auth');

const router = express.Router();

router.get('/myposts', routeAuth, adminController.getAdminPosts);

router.get("/new-post", routeAuth, adminController.getNewBlogPage);
router.post("/new-post", routeAuth, adminController.postNewBlog);

router.get('/edit-post/:blogId', routeAuth, adminController.getEditPage);
router.post('/myposts', routeAuth, adminController.postAdminPosts);
router.get('/delete-post/:postId', routeAuth, adminController.deletePost);

module.exports = router;