const Person = require('../models/personSchema'); // Make sure to provide the correct path

// Function to find a person by phone number and return the token
async function findTokenByPhoneNumber(phoneNumber) {
  try {
    const person = await Person.findOne({ phoneNumber });
    if (person) {
      return person.token;
    } else {
      // Return null or an appropriate value if the phone number is not found
      return null;
    }
  } catch (error) {
    console.error('Error finding token by phone number:', error);
    throw error; // You can handle errors as needed
  }
}

module.exports = findTokenByPhoneNumber;
