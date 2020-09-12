require('./models/db');

const express = require('express');
const path = require ('path');
const exphbs=require ('express-handlebars');
const bodyparser = require('body-parser');
const cors = require ('cors');


const employeeController = require('./controllers/employeeController');
var app = express();
//use function for middleware
app.use(bodyparser.urlencoded({
    extended: true
}));
//convert to format json 
app.use(bodyparser.json());

app.use(cors())

//configure le template handlebars 

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/participant', employeeController);