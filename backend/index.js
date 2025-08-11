const express = require('express')
const connectDb = require('./config/db');

const app = express() ;
app.use(express.json());
connectDb();

const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})