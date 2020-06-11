const express = require('express');

const blogController = require('../controller/blogs');
const router = express.Router();

router.get('/', blogController.getHomePage);

router.get('/blogs', blogController.getBlogsPage)

router.get('/article/:blogId', blogController.getFullBlog);

module.exports = router;

