const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;    // underscore determines that the variable is only used internally in this file

const mongoConnect = (cb)=>{
    MongoClient
      .connect(
        "mongodb+srv://pratik:pratikgoyal@cluster0-mlvox.mongodb.net/blogs?retryWrites=true&w=majority"
      )
      .then(client=>{
        console.log('connected');
        _db = client.db();
        cb();
      })
      .catch((err) => console.log(err));
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'no database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;