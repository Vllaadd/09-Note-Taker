const fs = require('fs');
const path = require('path');

var noteData;

module.exports = function(app){

    fs.readFile('db.json', 'utf8', function(err, data){ //first we read the data before any other action. 
        if(err) throw err;  //always handeling errors
        noteData = JSON.parse(data); //we need to parse data in order to manipulate it. 
    });

    app.get('/api/notes', function(req, res){ //to read the notes
        res.json(noteData);
    });

    app.post('/api/notes', function(req, res){ //to write the notes
        var newNote = req.body; //creating new variable which will be users new note
        noteData.push(newNote); //pushing the new note into the existing array 
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join('db.json'), parsedata, (err) => {
            if(err) throw err;
        })

        res.json(noteData);
    })

    app.delete('/api/notes/:id', function(req, res){ //to delete the notes
        var deleteData = req.params.id;                //id is necesssary so we know which note is being deleted
        for(i=0; i< noteData.length; i++) {
            if(deleteData === noteData[i].title){
                noteData.splice(i, 1)
            }
        }
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join('db.json'), parsedata, (err) => {
            if (err) throw err;
        })
        res.json(noteData)
    })

}