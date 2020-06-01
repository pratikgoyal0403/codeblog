const Blog = require('../model/blog');

exports.getNewBlogPage = (req, res, next) => {
    const username = req.user.username;
    res.render("admin/new-blog", { pageTitle: "create new blog post", path: '/new-post', username:  username});
}

exports.postNewBlog = (req, res, next) => {
    const blog = new Blog(
        req.body.title,
        req.body.author,
        req.body.description,
        req.body.body,
        req.user.userId
    );
    blog.addBlog().then(id=>{
        // console.log(status);
        req.user.save(id)
            res.redirect("/blogs");
        // console.log(status);
    }).catch(err=>console.log(err));
}


exports.getAdminPosts = (req, res, next) => {
    const username = req.user.username;
    Blog.fetchAllBlogsById(req.user.userId).then(data => {
        res.render('admin/myposts', { path: '/admin', posts: data, pageTitle: 'dashboard', username: username });
    }).catch(err=>console.log(err));
}

exports.getEditPage = (req, res, next) => {
    const username = req.user.username;
    const id = req.params.productId;
    const edit = req.query.edit;    
    Blog.getById(id).then(post => {
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
        userId: req.user.userId
    }
    Blog.EditPost(data).then(status=>{
        
        res.redirect('/admin/myposts');
    }).catch(err=>console.log(err));
}

exports.deletePost = (req, res, next)=>{
    const postId = req.params.postId;
    Blog.deletePostById(postId).then(status=>{
        req.user.deleteBlogById(postId);
        res.redirect('/admin/myposts');
    }).catch(err=>console.log(err));
}