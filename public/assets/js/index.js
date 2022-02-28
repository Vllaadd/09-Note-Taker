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

// Delete the clicked note
const handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles

const renderNoteList = (notes) => {
  console.log(JSON.stringify(notes))
  $noteList.empty();

  const noteListItems = [];

  // Returns jquery object for li with given text and delete button
  // unless withDeleteButton argument is provided as false
  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li("No saved Notes", false));
  }

  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();