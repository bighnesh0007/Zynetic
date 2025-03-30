const { Router } = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const z = require('zod');

const { UserModel } = require('../db');
const { JWT_User_Pass } = require('../config')
const userMiddleware = require('../middleware/user')
const { BookModel } = require('../db')


const userRouter = Router();


const signupSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name cannot exceed 50 characters"),
    email: z.string()
        .email("Invalid email format")
        .min(5, "Email must be at least 5 characters long")
        .max(50, "Email cannot exceed 50 characters"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password cannot exceed 50 characters"),
    phone: z.string()
        .regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z.string()
        .min(5, "Address must be at least 5 characters long")
        .max(100, "Address cannot exceed 100 characters")
});



const signinSchema = z.object({
    email: z.string()
        .email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
});



const validateInput = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }
};



userRouter.post('/signup', validateInput(signupSchema), async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
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

userRouter.post("/signin",  validateInput(signinSchema),async (req, res) => {
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