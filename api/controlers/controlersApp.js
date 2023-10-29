
const Person = require("../models/personSchema");

exports.handlePushRes = async (req, res) => {
    try {
      const { approval } = req.body;
  
      if (approval) {
        // Handle the approval logic on the server
        console.log('User has approved the notification on the client');
        // Add your server logic here
      }
  
      // Send a JSON success response
      res.json({ success: true });
    } catch (error) {
      console.error('Error handling approval:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // exports.handleUserInfo = async (req, res) => {
  //   try {
  //     const { token, phoneNumber, name } = req.body;
  //     console.log(token, phoneNumber, name);
  
  //     // You can save this information to your database or perform any other desired actions.
  //     // For this example, we'll just log the data.
  //     const newUser = new Person({
  //       token,
  //       phoneNumber,
  //       name,
  //     });
      
  //     await newUser.save();
  //     res.status(200).json(newUser);
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  