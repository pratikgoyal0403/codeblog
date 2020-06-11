const Blog = require('../model/blog');
const User = require('../model/users');
exports.getNewBlogPage = (req, res, next) => {
    const username = req.user.username;
    res.render("admin/new-blog", { pageTitle: "create new blog post", path: '/new-post', username:  username});
}

exports.postNewBlog = (req, res, next) => {
    const blog = new Blog({
       title:  req.body.title,
        author: req.body.author,
        description: req.body.description,
        body: req.body.body,
        userId: req.user._id
    });
    blog.save().then(blog=>{
            res.redirect("/blogs");
        // console.log(status);
    }).catch(err=>console.log(err));
}


exports.getAdminPosts = (req, res, next) => {
    const username = req.user.username;
    const id = req.user._id;
    Blog.find({userId: id}).then(data => {
        res.render('admin/myposts', { path: '/admin', posts: data, pageTitle: 'my posts', username: username });
    }).catch(err=>console.log(err));
}

exports.getEditPage = (req, res, next) => {
    const username = req.user.username;
    const id = req.params.blogId;
    const edit = req.query.edit;    
    Blog.findById(id).then(post => {
        res.render('admin/edit-post', { path: '', pageTitle: 'edit blog', editing: edit, post: post, username: username });
    });
}

exports.postAdminPosts = (req, res, next) => {
    const data = { 
        title: req.body.title, 
        author: req.body.author, 
        description: req.body.description, 
        body: req.body.body, 
        id: req.body.postId,
        userId: req.user._id
    }
    Blog.findByIdAndUpdate(data.id).then(blog=>{
        blog.title = data.title;
        blog.author = data.author;
        blog.description = data.description;
        blog.body = data.body;
        blog.userId = data.userId;
        blog.save().then(status=>{
            res.redirect('/admin/myposts');
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
}

exports.deletePost = (req, res, next)=>{
    const postId = req.params.postId;
    Blog.findByIdAndRemove(postId).then(status=>{
        res.redirect('/admin/myposts');
    }).catch(err=>console.log(err));
}