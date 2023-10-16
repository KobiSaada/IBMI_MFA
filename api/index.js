const express = require("express");
const app = express();
const dotenv =require("dotenv");
dotenv.config();
const cors= require("cors");
const config = require("./config")

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT ,() => {
    console.log('server listening on port http://1.1.1.94:2002');
})