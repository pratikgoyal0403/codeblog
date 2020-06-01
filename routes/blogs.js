const express = require('express');

const blogController = require('../controller/blogs');
const router = express.Router();

router.get('/', blogController.getHomePage);

router.get('/blogs', blogController.getBlogsPage)

router.get('/article/:productId', blogController.getFullBlog);

module.exports = router;

