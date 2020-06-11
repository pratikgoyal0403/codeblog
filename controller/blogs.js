const Blog = require('../model/blog');

exports.getHomePage = (req, res, next) => {
    
    Blog.find().then(blogs => {
        res.render('blog/home', { pageTitle: 'welcome to codeblog.com', posts: blogs, path: '/'});
    }).catch(err=>console.log(err));
}

exports.getBlogsPage = (req, res, next) => {
    
    Blog.find().then(blogs=>{        
        res.render('blog/blogs', { pageTitle: 'blogs', posts: blogs, path: '/blogs' });
    }).catch(err=>console.log(err));
}




exports.getFullBlog = (req, res, next) => {
    
    const id = req.params.blogId
    Blog.findById(id).then(blog => {
        res.render('blog/fullBlog', { path: '', pageTitle: blog.title, post: blog });
    }).catch(err=>console.log(err));
}




