const Person = require("../models/personSchema");

// Create a new user
exports.createUser = async (req, res) => {
    try {
      const { token, phoneNumber, name } = req.body;
      console.log(token, phoneNumber, name);

      const existingUser = await Person.findOne({ phoneNumber });

      if (existingUser) {
  
        return res.status(400).json({ error: 'User with this phone number already exists' });
      }
  
  
      // You can save this information to your database or perform any other desired actions.
      // For this example, we'll just log the data.
      const newUser = new Person({
        token,
        phoneNumber,
        name,
      });
      
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Read all users
exports.readAllUsers = async (req, res) => {
  try {
    const users = await Person.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a user by phone number
exports.readUserByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const user = await Person.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user information by phone number
exports.updateUserByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const updatedUser = await Person.findOneAndUpdate(
      { phoneNumber },
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user by phone number
exports.deleteUserByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const deletedUser = await Person.findOneAndDelete({ phoneNumber });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send(); // No content, successful deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's token by phone number
exports.getTokenByPhone = async (req, res) => {
    try {
      const { phoneNumber } = req.params;
      const user = await Person.findOne({ phoneNumber });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const token = user.token;
      res.status(200).json({ phoneNumber, token });
    } catch (error) {
      console.error('Error getting token by phone number:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.saveTokenUserInfo = async (req, res) => {
    try {
      const { token, phoneNumber, name } = req.body;
      const newUser = new Person({
        token,
        phoneNumber,
        name,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error saving user information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };