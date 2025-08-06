const express = require('express')
const connectDb = require('./config/db');

const app = express() ;
app.use(express.json());
connectDb();

const authRoute = require('./routes/authRoute');
app.use('/api/v1/auth', authRoute);


app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})