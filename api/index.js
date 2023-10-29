const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./MongoDB/dbConnect');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const personIbmi=require("./models/personIbmi");
const { sendPushNotifications } = require("./Utils/PushNotification");
const router = require("./routes/routes");
const findTokenByPhoneNumber  = require('./Utils/GetTokenByPhone'); // Import the function

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(router);


// // Usage: Call this function with the phone number to get the token
// findTokenByPhoneNumber("1")
//   .then(tokenToSend => {
//     console.log(tokenToSend);
//     // Use the token to send push notifications
//      //sendPushNotifications([tokenToSend]);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
app.post('/activate-script/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber; // Get the phone number from the URL parameter

    const tokenToSend = await findTokenByPhoneNumber(phoneNumber);

    // Once you have the result, you can use it as needed
    // Example: Send push notifications
    sendPushNotifications([tokenToSend]);

    res.status(200).json({ message: 'Script activated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.SERVER}:${process.env.PORT}`);
});


