const yourNotes = document.querySelector('.your-notes');
const noteComposer = document.querySelector('.note-composer');
const noteEditor = document.querySelector('.note-editor');
const createNoteButton = document.querySelector('#create-button');
const submitNoteButton = document.querySelector('#submit-button');
const editNoteButton = document.querySelector('#edit-button');
/* all querySelectorAll statements select two elements: 
   a note composer element and a note editor element */
const cancelNoteButton = document.querySelectorAll('.cancel-button');
const bgColor = document.querySelectorAll('.bg-color');
const boldButton = document.querySelectorAll('.bold-button');
const italicButton = document.querySelectorAll('.italic-button');
const fontSize = document.querySelectorAll('.font-size');
const fontColor = document.querySelectorAll('.font-color');
const noteTitleComposer = document.querySelector('#note-title-composer');
const noteInputComposer = document.querySelector('#note-input-composer');
const noteTitleEditor = document.querySelector('#note-title-editor');
const noteInputEditor = document.querySelector('#note-input-editor');
const titleRequiredField = document.querySelectorAll('.title-required-field');
const noteRequiredField = document.querySelectorAll('.note-required-field');
const previousNotes = document.querySelector('#previous-notes');
const previousNote = document.querySelector('.previous-note');
const yourNotesHeading = document.querySelector('#your-notes-heading');
let isNoteValid;

window.addEventListener('load',init);
createNoteButton.addEventListener('click',createNote);
submitNoteButton.addEventListener('click',submitNote);
editNoteButton.addEventListener('click',saveNoteEdits);
/* all the elements below which is part of an array have the structure as: 
  [0] -> note composer element , [1] -> note editor element */
cancelNoteButton[0].addEventListener('click',cancelNote);
cancelNoteButton[1].addEventListener('click',cancelNote);
bgColor[0].addEventListener('change',changeBgColor);
bgColor[1].addEventListener('change',changeBgColor);
boldButton[0].addEventListener('click',toggleNoteBold);
boldButton[1].addEventListener('click',toggleNoteBold);
italicButton[0].addEventListener('click',toggleNoteItalic);
italicButton[1].addEventListener('click',toggleNoteItalic);
fontSize[0].addEventListener('change',changeFontSize);
fontSize[1].addEventListener('change',changeFontSize);
fontColor[0].addEventListener('change',changeFontColor);
fontColor[1].addEventListener('change',changeFontColor);
noteInputComposer.addEventListener('input',validateInput);
noteInputEditor.addEventListener('input',validateInput);
noteTitleComposer.addEventListener('input',validateTitle);

//change input to notebody
/**
 * init takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the whole page is loaded.
 * This function displays all the saved notes with their applied styles.
 */
function init(){
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.reverse();
    if(notes !== null && notes.length !== 0){
        previousNotes.style.display = 'block';
        document.querySelector('#no-notes-found').style.display = 'none';
        document.querySelector('#noting-empty').style.display = 'none';
        notes.map((note)=>{
            let noteBody = document.createElement('div');
            let title = document.createElement('h3');
            // title.innerHTML = note.noteTitle;
            title.appendChild(document.createTextNode(note.noteTitle));
            title.classList.add('previous-note-title');
            noteBody.appendChild(title);
            let input = document.createElement('div');
            input.classList.add('previous-note-body');
            input.appendChild(document.createTextNode(note.noteInput));
            noteBody.appendChild(input);
            noteBody.appendChild(document.createElement('br'));
            let viewButton = document.createElement('button');
            viewButton.appendChild(document.createTextNode('View'));
            viewButton.setAttribute('id','view-button');
            noteBody.appendChild(viewButton);
            let deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('Delete'));
            deleteButton.setAttribute('id','delete-button');
            noteBody.appendChild(deleteButton);
            // noteBody.appendChild(document.createElement('br'));
            noteBody.style.backgroundColor = note.bgColor;
            noteBody.style.color = note.color;
            noteBody.classList.add('previous-note');
            noteBody.classList.add(`${note.noteTitle}`);
            noteBody.setAttribute('id',`${note.noteTitle}`);
            previousNotes.appendChild(document.createElement('br'));
            previousNotes.appendChild(noteBody);
            previousNotes.appendChild(document.createElement('br'));
            viewButton.addEventListener('click',viewPreviousNote);
            deleteButton.addEventListener('click',deletePreviousNote);
        });
    }
}

/**
 * createNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Create Note" button in the home page.
 * This function opens a note composer window where user can create a note.
 */
function createNote(){
    noteTitleComposer.value = '';
    noteInputComposer.value = '';
    yourNotesHeading.style.display = 'none';
    titleRequiredField[0].style.display = 'none';
    noteRequiredField[0].style.display = 'none';
    yourNotes.style.display = 'none';
    noteComposer.style.display = 'block';
    createNoteButton.style.display = 'none';
    noteInputComposer.style.fontSize = '15px';
}

/**
 * editNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "View" button in the home page.
 * This function opens a note editor window where user can edit a note.
 */
function editNote(){
    yourNotesHeading.style.display = 'none';
    titleRequiredField[1].style.display = 'none';
    noteRequiredField[1].style.display = 'none';
    yourNotes.style.display = 'none';
    noteEditor.style.display = 'block';
    createNoteButton.style.display = 'none';
}

/**
 * changeBgColor takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Change Background(icon)" button in the note editor/note composer.
 * This function changes the background color of the note body in note composer/note editor.
 */
function changeBgColor(event){
    event.target.classList.contains('composer') === true ? noteInputComposer.style.backgroundColor = bgColor[0].value : noteInputEditor.style.backgroundColor = bgColor[1].value;
}

/**
 * toggleNoteBold takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Bold(icon)" button in the note editor/note composer.
 * This function toggles the boldness of the note body in note composer/note editor.
 */
function toggleNoteBold(event){
    if(event.target.classList.contains('composer')){
        noteInputComposer.style.fontWeight === 'bold' ? noteInputComposer.style.fontWeight = 'normal' : noteInputComposer.style.fontWeight = 'bold';
        noteInputComposer.style.fontWeight === 'bold' ? boldButton[0].style.backgroundColor = 'green' : boldButton[0].style.backgroundColor = '#ff8000';
    }
    else{
        noteInputEditor.style.fontWeight === 'bold' ? noteInputEditor.style.fontWeight = 'normal' : noteInputEditor.style.fontWeight = 'bold';
        noteInputEditor.style.fontWeight === 'bold' ? boldButton[1].style.backgroundColor = 'green' : boldButton[1].style.backgroundColor = '#ff8000';
    }
}

/**
 * toggleNoteItalic takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Italic(icon)" button in the note editor/note composer.
 * This function toggles the italic style of the note body in note composer/note editor.
 */
function toggleNoteItalic(event){
    if(event.target.classList.contains('composer')){
        noteInputComposer.style.fontStyle === 'italic' ? noteInputComposer.style.fontStyle ='normal' : noteInputComposer.style.fontStyle = 'italic';
        noteInputComposer.style.fontStyle === 'italic' ? italicButton[0].style.backgroundColor = 'green' : italicButton[0].style.backgroundColor = '#ff8000';
    }
    else{
        noteInputEditor.style.fontStyle === 'italic' ? noteInputEditor.style.fontStyle ='normal' : noteInputEditor.style.fontStyle = 'italic';
        noteInputEditor.style.fontStyle === 'italic' ? italicButton[1].style.backgroundColor = 'green' : italicButton[1].style.backgroundColor = '#ff8000';
    }
}

/**
 * changeFontSize takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user changes the value of "Change Font Size" input field in the note editor/note composer.
 * This function changes the font size of the note body in note composer/note editor.
 */
function changeFontSize(event){
    event.target.classList.contains('composer') === true ? noteInputComposer.style.fontSize = `${fontSize[0].value}px` : noteInputEditor.style.fontSize = `${fontSize[1].value}px`;
}

/**
 * changeFontColor takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Change Font Color(icon)" button in the note editor/note composer.
 * This function changes the font color of the note body in note composer/note editor.
 */
function changeFontColor(event){
    event.target.classList.contains('composer') === true ? noteInputComposer.style.color = fontColor[0].value : noteInputEditor.style.color = fontColor[1].value;
}

/**
 * viewPreviousNote takes no arguments.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "View" button in the home page.
 * This function opens a note editor window where user can edit a note.
 */
function viewPreviousNote(event){
    // console.log(event);
    let [previousNoteTitle, previousNoteInput] = event.target.parentNode.children;
    // console.log(previousNoteTitle);
    editNote();
    noteTitleEditor.value = previousNoteTitle.innerHTML;
    noteInputEditor.value = previousNoteInput.innerHTML;
    let notes = JSON.parse(localStorage.getItem('notes'));
    if(notes !== null){
        notes.map((note)=>{
            if(note.noteTitle === previousNoteTitle.innerHTML){
                noteInputEditor.style.backgroundColor = note.bgColor;
                noteInputEditor.style.color = note.color;
                noteInputEditor.style.fontSize = note.fontSize;
                noteInputEditor.style.fontStyle = note.italic;
                noteInputEditor.style.fontWeight = note.bold;
                fontSize[1].value = note.fontSize.slice(0,2);
                noteInputEditor.style.fontWeight === 'bold' ? boldButton[1].style.backgroundColor = 'green' : boldButton[1].style.backgroundColor = '#ff8000';
                noteInputEditor.style.fontStyle === 'italic' ? italicButton[1].style.backgroundColor = 'green' : italicButton[1].style.backgroundColor = '#ff8000';
            }
        });
    }
}

/**
 * validateTitle takes no arguments.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Submit" button in the note composer.
 * This function displays a "Title is required field" message.
 */
function validateTitle(event){
    if(event.target.value !== ''){
        titleRequiredField[0].style.display = 'none';
    }
    else{
        titleRequiredField[0].style.display = 'block';
    }
}

/**
 * validateInput takes no arguments.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Submit" button in the note composer/note editor.
 * This function displays a "Note is required field" message.
 */
function validateInput(event){
    if(event.target.value !== ''){
        if(event.target.id === 'note-input-composer'){
            noteRequiredField[0].style.display = 'none';
        }
        else{
            noteRequiredField[1].style.display = 'none';
        }
    }
    else{
        if(event.target.id === 'note-input-composer'){
            noteRequiredField[0].style.display = 'block';
        }
        else{
            noteRequiredField[1].style.display = 'block';
        }
    }
}

/**
 * validateNewNote takes "note" as argument.
 * There is no return value in all cases.
 * @param {object} note
 * This function is fired when the user clicks on "Submit" button in the note composer/note editor.
 * This function validates if a note with the same title is already present in localStorage.
 */
function validateNewNote(note){
    if(note.noteTitle === noteTitleComposer.value){
        isNoteValid = false;
        alert('You already have a note with the same title. Please change yor title and save again!');
    }
}

/**
 * submitNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Submit" button in the note composer/note editor.
 * This function validates the note title, saves the note body, title and styles and pushes it to localStorage.
 */
function submitNote(){
    isNoteValid = true;
    noteTitleComposer.value === '' ? titleRequiredField[0].style.display = 'block' : titleRequiredField[0].style.display = 'none';
    noteInputComposer.value === '' ? noteRequiredField[0].style.display = 'block' : noteRequiredField[0].style.display = 'none';
    if(localStorage.getItem('notes') === null){
        localStorage.setItem('notes', '[]');
    }
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach(validateNewNote);
    if(isNoteValid && noteTitleComposer.value !== '' && noteInputComposer.value !== ''){
        notes.push({
            noteTitle: noteTitleComposer.value,         
            noteInput: noteInputComposer.value, 
            bold: noteInputComposer.style.fontWeight, 
            italic: noteInputComposer.style.fontStyle, 
            color: noteInputComposer.style.color, 
            bgColor: noteInputComposer.style.backgroundColor,
            fontSize: noteInputComposer.style.fontSize
        });
        localStorage.setItem('notes',JSON.stringify(notes));
        noteComposer.style.display = 'none';
        yourNotes.style.display = 'block';
        createNoteButton.style.display = 'block';
        location.reload();
    }
}

/**
 * saveNoteEdits takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Edit" button in the note composer/note editor.
 * This function applies all the changes to note body ans saves it to localStorage.
 */
function saveNoteEdits(){
    noteTitleEditor.value === '' ? titleRequiredField[1].style.display = 'block' : titleRequiredField[1].style.display = 'none';
    noteInputEditor.value === '' ? noteRequiredField[1].style.display = 'block' : noteRequiredField[1].style.display = 'none';
    if(noteTitleEditor.value !== '' && noteInputEditor.value !== ''){
        let notes = JSON.parse(localStorage.getItem('notes'));
        notes.forEach((note)=>{
            if(note.noteTitle === noteTitleEditor.value){
                note.noteTitle = noteTitleEditor.value,         
                note.noteInput = noteInputEditor.value, 
                note.bold = noteInputEditor.style.fontWeight, 
                note.italic = noteInputEditor.style.fontStyle, 
                note.color = noteInputEditor.style.color, 
                note.bgColor = noteInputEditor.style.backgroundColor,
                note.fontSize = noteInputEditor.style.fontSize
            }
        });
        localStorage.setItem('notes',JSON.stringify(notes));
        noteEditor.style.display = 'none';
        yourNotes.style.display = 'block';
        createNoteButton.style.display = 'block';
        location.reload();
    }
}

/**
 * deletePreviousNote takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Delete" button in the home page.
 * This function deletes a note from localStorage.
 */
function deletePreviousNote(event){
    let [previousNoteTitle,] = event.target.parentNode.children;
    console.log(previousNoteTitle);
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach((note)=>{
        if(note.noteTitle === previousNoteTitle.innerHTML){
            let index = notes.indexOf(note);
            console.log(index);
            notes.splice(index,1);
        }
    });
    localStorage.setItem('notes',JSON.stringify(notes));
    location.reload();
}

/**
 * cancelNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Cancel" button in note composer/note editor.
 * This function takes the user back to home page from note editor/note composer.
 */
function cancelNote(){
    noteComposer.style.display = 'none';
    noteEditor.style.display = 'none';
    yourNotes.style.display = 'block';
    createNoteButton.style.display = 'block';
    location.reload(); 
}

