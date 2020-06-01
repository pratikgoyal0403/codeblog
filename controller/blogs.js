const Blog = require('../model/blog');

exports.getHomePage = (req, res, next) => {
    const username = req.user.username;
    Blog.fetchAllBlogs().then(blogs => {
        res.render('blog/home', { pageTitle: 'welcome to codeblog.com', posts: blogs, path: '/', username: username });
    }).catch(err=>console.log(err));
}

exports.getBlogsPage = (req, res, next) => {
    const username = req.user.username;
    Blog.fetchAllBlogs().then(blogs=>{
        console.log(blogs);
        res.render('blog/blogs', { pageTitle: 'blogs', posts: blogs, path: '/blogs', username: username });
    }).catch(err=>console.log(err));
}




exports.getFullBlog = (req, res, next) => {
    const username = req.user.username;
    const id = req.params.productId
    Blog.getById(id).then(blog => {
        res.render('blog/fullBlog', { path: '', pageTitle: blog.title, post: blog, username: username });
    }).catch(err=>console.log(err));
}


//ADMIN CONTROLLERS DOWN 

