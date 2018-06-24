const mongoose = require('mongoose');

// mongoose promise

mongoose.Promise = global.Promise;

// mongoose connect
mongoose.connect('mongodb://pusher:123456a@ds161620.mlab.com:61620/pusher-js')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

