const express = require('express');
const mongoose = require('mongoose');
const port = 8000;

const { userRouter } = require('./routes/Users');
const {bookRouter} = require('./routes/Books');


const app = express();


app.use(express.json());


app.use("/user", userRouter);
app.use("/book", bookRouter);


async function main() {
    mongoose.connect("mongodb://localhost:27017/test");

    console.log("db connected....");
    app.listen(port, () => {
        console.log('Server is running on port 8000');
    });
}

main();
