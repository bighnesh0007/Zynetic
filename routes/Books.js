const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express')


const { BookModel } = require('../db')
const { JWT_User_Pass } = require('../config')
const { userMiddleware } = require('../middleware/user')


const bookRouter = Router();


bookRouter.get('/filter', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const { author, category, price, rating } = req.query;

    const filter = { user_id: userID };

    if (author) filter.author = { $regex: author, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (price) filter.price = { $gte: parseFloat(price) };
    if (rating) filter.rating = { $gte: parseFloat(rating) };

    try {
        const books = await BookModel.findOne(filter);

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found matching the criteria' });
        }

        res.status(200).json(books);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

bookRouter.get('/filter/:title', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const title = req.params.title;
    try {
        const books = await BookModel.find({ user_id: userID, title: { $regex: title, $options: 'i' } });
        if (!books) {
            return res.status(404).json({ message: 'Books not found' });
        }
        if (books.length === 0) {
            return res.status(404).json({ message: 'Books not found' });
        }
        res.status(200).json(books);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error fetching books' });
    }
}
)

bookRouter.get('/all', async (req, res) => {
    try {
        const books = await BookModel.find({});
        res.status(200).json(books);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error fetching books' });
    }
})

bookRouter.post('/create', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const { title, author, category, price, rating } = req.body;

    try {
        await BookModel.create({
            user_id: userID,
            title: title,
            author: author,
            category: category,
            price: price,
            rating: rating,
        })
        res.status(201).json({ message: 'Book added successfully' });

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error adding book' });
    }

})

bookRouter.get('/:id', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const bookID = req.params.id;


    try {
        const books = await BookModel.findOne({ user_id: userID, _id: bookID });
        if (!books) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(books);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error fetching user books' });
    }
})

bookRouter.put('/:id', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const bookID = req.params.id;

    const { title, author, category, price, rating } = req.body;
    try {
        const BookUpdate = await BookModel.findOneAndUpdate({ user_id: userID, _id: bookID }, {
            title: title,
            author: author,
            category: category,
            price: price,
            rating: rating,
        }, { new: true });
        if (!BookUpdate) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', book: BookUpdate });

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error updating book' });
    }

})
bookRouter.delete('/:id', userMiddleware, async (req, res) => {
    const userID = req.userId;
    const bookID = req.params.id;
    try {
        const BookDelete = await BookModel.findOneAndDelete({ user_id: userID, _id: bookID });
        if (!BookDelete) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error deleting book' });
    }

})


module.exports = {
    bookRouter: bookRouter
}

