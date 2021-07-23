const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/goingoncedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});