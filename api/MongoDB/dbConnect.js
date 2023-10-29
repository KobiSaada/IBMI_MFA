const mongoose = require('mongoose');
const dotenv =require("dotenv");
dotenv.config();

const dbUri = process.env.MONGO_URL;


mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
