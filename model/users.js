
//add mongoose code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    blogs: {
        type: [Schema.Types.ObjectId]
    }
})



module.exports = mongoose.model('user', userSchema);