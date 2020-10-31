var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

//===KEEPING TRACK OF THE NOTES IN THE TEXTAREA==============================
var activeNote = {};

//===GETTING NOTES FROM THE DATABASE=========================================
var getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

//===SAVING NOTES TO THE DATABASE============================================
var saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

//===DELETING NOTES FROM THE DATABASE=======================================
var deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

//===IF ACTIVE NOTE FOUND DISPLAY IT========================================
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

//===GET NOTES FROM THE INPUTS AND SAVE IT TO THE DATABASE=====================
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

