const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    published_date: { type: Date, default: Date.now },
    user_id: { type: ObjectId, ref: 'User' },
})

const UserModel = mongoose.model('User', userSchema);
const BookModel = mongoose.model('Book', bookSchema);

module.exports = { UserModel, BookModel };
