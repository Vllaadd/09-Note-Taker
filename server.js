//===DEPENDENCIES========================================
const express = require('express') 
const app = express()
 
//===SET UP THE PORT=====================================
const PORT = process.env.PORT || 8080;

//===SET UP THE DATA PARSING=============================
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//===ROUTES==============================================
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//===GET SERVER RUNNING==================================
app.listen(PORT, function(){
    console.log('Listneing on the port: ' + PORT);
})