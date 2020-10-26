var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// A function for saving a note to the db
var saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// A function for deleting a note from the db
var deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {  //if the user is writing  a note (meaning, the note is active)
    $noteTitle.attr("readonly", true); //make the title and the body of the note view only
    $noteText.attr("readonly", true); //I don`t think we need this. I might delete these two lines. 
    $noteTitle.val(activeNote.title); //we are giving the value to the note title
    $noteText.val(activeNote.text); //giving value to the note body
  } else { //meaning if the note is not active, meaning, if no user is writing a note at the moment. 
    $noteTitle.attr("readonly", false); //then make the writing in these two areas available
    $noteText.attr("readonly", false);
    $noteTitle.val(""); //and give the value to the textarea but without any concrete sinec noone is writing
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () { //this function puts notes into the newNote object.
  const newNote = { //we didn`t store the note anywhere in the previou function, we only gave it the value. Undertand that difference. Here we are storing it into an object, so it will remained saved. 
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => { 
    getAndRenderNotes();
    renderActiveNote();
  });
};

