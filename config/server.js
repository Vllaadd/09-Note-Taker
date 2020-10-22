const express = require('expres'); 
const app = express(); //creating express server.

const PORT = process.argv.env.PORT || 8080; //whatever is in the environment variable PORT, or 8080 if there`s nothing there.

app.use(express.urlencoded({extended: true}));  //setting up the express app which will handle data parsing.
app.use(express.json());
app.use(express.static('public'));

require('../public/index.html');    //connecting to route files.
require('../public/notes.html');    

app.listen(PORT, function(){    //this code starts our server.
    console.log('App listening on port: ' + PORT);
});
