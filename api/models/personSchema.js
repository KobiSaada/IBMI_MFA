const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name:  {type: String, required: true},
  phoneNumber:{type: String, required: true, unique: true},
  token : {type: String, required: true},
});

const Person = mongoose.model('Persons', personSchema);
module.exports = Person;
