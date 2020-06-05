const Blog = require('../model/blog');

exports.getHomePage = (req, res, next) => {
    // const username = req.user.username;
    Blog.find().then(blogs => {
        res.render('blog/home', { pageTitle: 'welcome to codeblog.com', posts: blogs, path: '/', username: 'pratik'});
    }).catch(err=>console.log(err));
}

exports.getBlogsPage = (req, res, next) => {
    // const username = req.user.username;
    Blog.find().then(blogs=>{        
        res.render('blog/blogs', { pageTitle: 'blogs', posts: blogs, path: '/blogs', username: 'pratik' });
    }).catch(err=>console.log(err));
}




exports.getFullBlog = (req, res, next) => {
    // const username = req.user.username;
    const id = req.params.productId
    Blog.findById(id).then(blog => {
        res.render('blog/fullBlog', { path: '', pageTitle: blog.title, post: blog, username: 'pratik' });
    }).catch(err=>console.log(err));
}


//ADMIN CONTROLLERS DOWN 

