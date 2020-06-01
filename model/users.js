const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

module.exports = class Users {
  constructor(username, email, blogs, usrId) {
    this.username = username;
    this.email = email;
    this.blogs = blogs;
    this.userId = usrId;
  }
  save(blogId) {
    const db = getDb();
    const updatedBlogs = this.blogs;
    updatedBlogs.push(blogId);
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.userId) },
        { $set: { blogs: updatedBlogs } }
      )
      .then((result) => result)
      .catch((err) => err);
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((user) => user)
      .catch((err) => err);
  }
  deleteBlogById(id) {
    const db = getDb();
    const updatedBlogs = this.blogs;
    const index = updatedBlogs.findIndex((blogId) => {
      return blogId.toString() === id.toString();
    });
    updatedBlogs.splice(index, 1);
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.userId) },
        { $set: { blogs: updatedBlogs } }
      )
      .then((response) => response)
      .catch((err) => err);
  }
};
