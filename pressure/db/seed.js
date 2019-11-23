const Tasks = require('../models/Tasks');
const data = require('./seeds.json');
const mongoose = require('./connection.js');

mongoose.connection.once('open', () => {
	console.log('seeds connected to mongo');
});

Tasks.deleteMany({})
  .then(() => {
    return Tasks.collection.insertMany(data);
  })
  .then(() => {
    process.exit();
  });
