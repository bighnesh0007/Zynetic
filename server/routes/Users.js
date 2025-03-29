const { Router } = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserModel } = require('../db');
const {JWT_User_Pass} =require('../config')

const userRouter = Router();






module.exports = {
    userRouter: userRouter
}