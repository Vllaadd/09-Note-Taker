const path = require('path');

module.exports = function(app){

//===/NOTES RESPONDS WITH THE NOTES.HTML FILE===========================
    app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  //===ALL OTHER ROUTES RESPOND WITH THE INDEX.HTML FILE================
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}




