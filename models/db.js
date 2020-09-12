const mongoose = require('mongoose');
//on autiliser mongoose pour faure conncter a la base de donnees

mongoose.connect('mongodb+srv://robotic707:rohanmongo@cluster0.08zyr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee-model');