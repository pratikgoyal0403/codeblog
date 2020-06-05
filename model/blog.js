const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('blog', blogSchema);
// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// module.exports = class Blogs {
//   constructor(title, author, description, body, userId) {
//     this.title = title;
//     this.author = author;
//     this.description = description;
//     this.body = body;
//     this.userId = userId;
//   }
//   addBlog() {
//     const db = getDb();
//     return db
//       .collection("blogs")
//       .insertOne(this)
//       .then((status) => status.ops[0]._id)
//       .catch((err) => err);
//   }
//   static getById(id) {
//     const db = getDb();
//     return db
//       .collection("blogs")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((blog) => blog)
//       .catch((err) => err);
//   }
//   static fetchAllBlogsById(id) {
//     const db = getDb();
//     return db
//       .collection("blogs")
//       .find({ userId: new mongodb.ObjectId(id) })
//       .toArray()
//       .then((blogs) => blogs)
//       .catch((err) => err);
//   }
//   static fetchAllBlogs() {
//     const db = getDb();
//     return db
//       .collection("blogs")
//       .find()
//       .toArray()
//       .then((blogs) => blogs)
//       .catch((err) => err);
//   }
//   static EditPost(post) {
//     const db = getDb();
//     const updatedPost = {
//       title: post.title,
//       author: post.author,
//       description: post.description,
//       body: post.body,
//       userId: post.userId
//     };
//     return db
//       .collection("blogs")
//       .replaceOne({ _id: new mongodb.ObjectId(post.id) }, { ...updatedPost })
//       .then((status) => status)
//       .catch((err) => err);
//   }
//   static deletePostById(id) {
//     const db = getDb();
//     return db
//       .collection("blogs")
//       .remove({ _id: new mongodb.ObjectId(id) })
//       .then((status) => status)
//       .catch((err) => err);
//   }
// };
