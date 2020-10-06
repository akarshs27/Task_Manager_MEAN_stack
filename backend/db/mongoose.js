 const mongoose = require('mongoose');
 
 mongoose.Promise = global.Promise;
 
 mongoose.connect('mongodb://localhost:27017/TaskManager' , { useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
     console.log("connected to MongoDB server successfully");
 })
 .catch((e) => {
     console.log("Error while attempting to connecting to MongoDB server");
     console.log(e);
 })
 
 mongoose.set('useCreateIndex', true);
 mongoose.set('useFindAndModify', false);
 
 module.exports = {
     mongoose
 }