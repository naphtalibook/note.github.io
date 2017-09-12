var allNotes = [];
var noteText;
var noteTime;
var noteDate;
var flagForFade = 0;  //makes sure that the fade effect is done only when necessary

//get data from local storage and sent to print
if (localStorage.getItem("allNotes") != null) {
    allNotes = JSON.parse(localStorage.getItem("allNotes"));
    printNote();
}

//get the values -> validate -> construct object -> add to array -> send to print.
function addNote() {
    var noteText = document.getElementById("mainTextArea").value;
    var noteTime = document.getElementById("inputTime").value;
    var noteDate = document.getElementById("inputDate").value.split("-").reverse().join("/").toString();
    var noteId = Math.floor(Math.random() * 999999) + 9999;

    //"required" validaiton
    var messege = document.getElementById("validation");
    if (noteText == "" && noteDate == "") {
        messege.innerHTML = "*content and date are required*";
        flagForFade = 1; //no permishion for fade effect
    } else if (noteDate == "") {
        messege.innerHTML = "*date required*";
        flagForFade = 1;
    } else if (noteText == "") {
        messege.innerHTML = "*content required*";
        flagForFade = 1;
    } else {
        messege.innerHTML = "";
        flagForFade = 0; //'OK' for fade effect

        //send to constructor and add to allNotes array
        allNotes.push(new createNote(noteText, noteTime, noteDate, noteId));

        saveOnStorage();
        printNote();
        clearInputs();
    }
}

//clean note area -> print all notes again -> add for every note deleat button an event listener
function printNote() {
    var printArea = document.getElementById("noteList");
    printArea.innerHTML = "";

    for (var i = 0; i < allNotes.length; i++) {

        //create sticky note
        var stickyNote = document.createElement("DIV");
        stickyNote.className = "stickyNote";
        printArea.appendChild(stickyNote);


        //create delete button
        var deleatButton = document.createElement("BUTTON");
        deleatButton.className = "glyphicon glyphicon-remove";
        stickyNote.appendChild(deleatButton);

        //text on the note
        var textOnNote = document.createElement("P");
        textOnNote.className = "noteIneerText";
        textOnNote.innerHTML = allNotes[i].NoteText;
        stickyNote.appendChild(textOnNote);

        //time on note
        var timeOnNote = document.createElement("SPAN");
        timeOnNote.className = "time";
        timeOnNote.innerHTML = allNotes[i].NoteTime;
        stickyNote.appendChild(timeOnNote);

        //date on note
        var dateOnNote = document.createElement("SPAN");
        dateOnNote.className = "date";
        dateOnNote.innerHTML = allNotes[i].NoteDate;
        stickyNote.appendChild(dateOnNote);

        //attaches the new sticky note a unique id
        stickyNote.id = allNotes[i].Id;
        
        //event listener for deleating the note
        deleatButton.addEventListener("click", function () {
            deleatNote(this.parentElement.id);
            saveOnStorage();
            printNote();
        });        
    }
}

//fadein effect
var addButton = document.getElementById("addNote");
addButton.addEventListener("click", function () {
    if (flagForFade == 0) {
        document.getElementById(allNotes[allNotes.length - 1].Id).style.animation = "fade 1s";
    }
});


//remove the object frome the array
function deleatNote(id) {
    for (var i = 0; i < allNotes.length; i++) {
        if (allNotes[i].Id == id) {
            allNotes.splice(i, 1);
        }
    }
}
function saveOnStorage() {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
}
//function constractor
function createNote(_noteText, _noteTime, _noteDate, _id) {
    this.NoteText = _noteText;
    this.NoteTime = _noteTime;
    this.NoteDate = _noteDate;
    this.Id = _id
}
function clearInputs() {
    document.getElementById("mainTextArea").value = "";
    document.getElementById("inputTime").value = "00:00";
    document.getElementById("inputDate").value = "";
}


