// require dependencies
const express = require('express') 
const app = express()

//set up the port 
const PORT = process.env.PORT || 8080;

//set up the data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// require routes 
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// get server running 
app.listen(PORT, function(){
    console.log('Listneing on the port: ' + PORT);
})