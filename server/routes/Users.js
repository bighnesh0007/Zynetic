const { Router } = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserModel } = require('../db');
const { JWT_User_Pass } = require('../config')
const userMiddleware = require('../middleware/user')
const { BookModel } = require('../db')

const userRouter = Router();


userRouter.post('/signup', async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address
        });
        res.status(201).json({ message: 'User created successfully' });


    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error creating user' });

    }
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({
            email: email,
            password: password
        })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, JWT_User_Pass);

        res.status(200).json({ message: 'User signed in successfully', token: token });

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error signing in' });
    }
})





module.exports = {
    userRouter: userRouter
}