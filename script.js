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
const noteBodyComposer = document.querySelector('#note-body-composer');
const noteTitleEditor = document.querySelector('#note-title-editor');
const noteBodyEditor = document.querySelector('#note-body-editor');
const titleRequiredField = document.querySelectorAll('.title-required-field');
const noteRequiredField = document.querySelectorAll('.note-required-field');
const previousNotes = document.querySelector('#previous-notes');
const previousNote = document.querySelector('.previous-note');
const yourNotesHeading = document.querySelector('#your-notes-heading');
let isNoteValid;

/**
 * init takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the whole page is loaded.
 * This function displays all the saved notes with their applied styles.
 */
const init = () => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.reverse(); //to display recent notes at the top
    if(notes !== null && notes.length !== 0){
        previousNotes.style.display = 'block';
        document.querySelector('#no-notes-found').style.display = 'none';
        document.querySelector('#noting-empty').style.display = 'none';
        //displaying all the saved notes on the home page
        notes.map((note)=>{
            let body = document.createElement('div');
            let title = document.createElement('h3');
            title.appendChild(document.createTextNode(note.noteTitle));
            title.classList.add('previous-note-title');
            body.appendChild(title);
            let input = document.createElement('div');
            input.classList.add('previous-note-body');
            input.appendChild(document.createTextNode(note.noteBody));
            body.appendChild(input);
            body.appendChild(document.createElement('br'));
            let viewButton = document.createElement('button');
            viewButton.appendChild(document.createTextNode('View'));
            viewButton.setAttribute('id','view-button');
            body.appendChild(viewButton);
            let deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('Delete'));
            deleteButton.setAttribute('id','delete-button');
            body.appendChild(deleteButton);
            // body.appendChild(document.createElement('br'));
            body.style.backgroundColor = note.bgColor;
            body.style.color = note.color;
            body.classList.add('previous-note');
            body.classList.add(`${note.noteTitle}`);
            body.setAttribute('id',`${note.noteTitle}`);
            previousNotes.appendChild(document.createElement('br'));
            previousNotes.appendChild(body);
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
const createNote = () => {
    noteTitleComposer.value = '';
    noteBodyComposer.value = '';
    yourNotesHeading.style.display = 'none';
    titleRequiredField[0].style.display = 'none';
    noteRequiredField[0].style.display = 'none';
    yourNotes.style.display = 'none';
    noteComposer.style.display = 'block';
    createNoteButton.style.display = 'none';
    noteBodyComposer.style.fontSize = '15px';
}

/**
 * editNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "View" button in the home page.
 * This function opens a note editor window where user can edit a note.
 */
const editNote = () => {
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
const changeBgColor = event => {
    event.target.classList.contains('composer') === true ? noteBodyComposer.style.backgroundColor = bgColor[0].value : noteBodyEditor.style.backgroundColor = bgColor[1].value;
}

/**
 * toggleNoteBold takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Bold(icon)" button in the note editor/note composer.
 * This function toggles the boldness of the note body in note composer/note editor.
 */
const toggleNoteBold = event => {
    //for composer
    if(event.target.classList.contains('composer')){
        //make the text in the note body bold
        noteBodyComposer.style.fontWeight === 'bold' ? noteBodyComposer.style.fontWeight = 'normal' : noteBodyComposer.style.fontWeight = 'bold';
        //highlight the bold button to indicate boldness has been applied 
        noteBodyComposer.style.fontWeight === 'bold' ? boldButton[0].style.backgroundColor = 'green' : boldButton[0].style.backgroundColor = '#ff8000';
    }
    //for editor
    else{
        //make the text in the note body bold
        noteBodyEditor.style.fontWeight === 'bold' ? noteBodyEditor.style.fontWeight = 'normal' : noteBodyEditor.style.fontWeight = 'bold';
        //highlight the bold button to indicate boldness has been applied 
        noteBodyEditor.style.fontWeight === 'bold' ? boldButton[1].style.backgroundColor = 'green' : boldButton[1].style.backgroundColor = '#ff8000';
    }
}

/**
 * toggleNoteItalic takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Italic(icon)" button in the note editor/note composer.
 * This function toggles the italic style of the note body in note composer/note editor.
 */
const toggleNoteItalic = event => {
    //for composer 
    if(event.target.classList.contains('composer')){
        //make the text in the note body italic
        noteBodyComposer.style.fontStyle === 'italic' ? noteBodyComposer.style.fontStyle ='normal' : noteBodyComposer.style.fontStyle = 'italic';
        //highlight the italic button to indicate italic style has been applied 
        noteBodyComposer.style.fontStyle === 'italic' ? italicButton[0].style.backgroundColor = 'green' : italicButton[0].style.backgroundColor = '#ff8000';
    }
    //for editor
    else{
        //make the text in the note body italic
        noteBodyEditor.style.fontStyle === 'italic' ? noteBodyEditor.style.fontStyle ='normal' : noteBodyEditor.style.fontStyle = 'italic';
        //highlight the italic button to indicate italic style has been applied 
        noteBodyEditor.style.fontStyle === 'italic' ? italicButton[1].style.backgroundColor = 'green' : italicButton[1].style.backgroundColor = '#ff8000';
    }
}

/**
 * changeFontSize takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user changes the value of "Change Font Size" input field in the note editor/note composer.
 * This function changes the font size of the note body in note composer/note editor.
 */
const changeFontSize = event => {
    event.target.classList.contains('composer') === true ? noteBodyComposer.style.fontSize = `${fontSize[0].value}px` : noteBodyEditor.style.fontSize = `${fontSize[1].value}px`;
}

/**
 * changeFontColor takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "Change Font Color(icon)" button in the note editor/note composer.
 * This function changes the font color of the note body in note composer/note editor.
 */
const changeFontColor = event => {
    event.target.classList.contains('composer') === true ? noteBodyComposer.style.color = fontColor[0].value : noteBodyEditor.style.color = fontColor[1].value;
}

/**
 * viewPreviousNote takes no arguments.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user clicks on "View" button in the home page.
 * This function opens a note editor window where user can edit a note.
 */
const viewPreviousNote = event => {
    //get the title and body of note taht has been selected to view using the Javascript event
    let [previousNoteTitle, previousNoteBody] = event.target.parentNode.children;
    //call the editNote function to get the note editor window ready
    editNote();
    //fill the note editor window with title,body and styles of the note selected
    noteTitleEditor.value = previousNoteTitle.innerHTML;
    noteBodyEditor.value = previousNoteBody.innerHTML;
    let notes = JSON.parse(localStorage.getItem('notes'));
    if(notes !== null){
        notes.map((note)=>{
            if(note.noteTitle === previousNoteTitle.innerHTML){
                noteBodyEditor.style.backgroundColor = note.bgColor;
                noteBodyEditor.style.color = note.color;
                noteBodyEditor.style.fontSize = note.fontSize;
                noteBodyEditor.style.fontStyle = note.italic;
                noteBodyEditor.style.fontWeight = note.bold;
                fontSize[1].value = note.fontSize.slice(0,2);
                noteBodyEditor.style.fontWeight === 'bold' ? boldButton[1].style.backgroundColor = 'green' : boldButton[1].style.backgroundColor = '#ff8000';
                noteBodyEditor.style.fontStyle === 'italic' ? italicButton[1].style.backgroundColor = 'green' : italicButton[1].style.backgroundColor = '#ff8000';
            }
        });
    }
}

/**
 * validateTitle takes no arguments.
 * There is no return value in all cases.
 * @param {object} event
 * This function is fired when the user leaves the note title input field blank in the note composer.
 * This function displays a "Title is required field" message.
 */
const validateTitle = event => {
    //this is applicable for note composer only as user cannot edit title in note editor
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
 * This function is fired when the user leaves the note body input field blank in the note composer/note editor.
 * This function displays a "Note is required field" message.
 */
const validateInput = event => {
    if(event.target.value !== ''){
        //hide the messagefor note composer
        if(event.target.id === 'note-input-composer'){
            noteRequiredField[0].style.display = 'none';
        }
        //hide the message for note editor
        else{
            noteRequiredField[1].style.display = 'none';
        }
    }
    else{
        //display the message for note composer
        if(event.target.id === 'note-input-composer'){
            noteRequiredField[0].style.display = 'block';
        }
        //display the message for note editor
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
const validateNewNote = note => {
    if(note.noteTitle === noteTitleComposer.value){
        isNoteValid = false;
        alert('You already have a note with the same title. Please change yor title and save again!');
    }
}

/**
 * submitNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Submit" button in the note composer.
 * This function validates the note title, saves the note body, title and styles and pushes it to localStorage.
 */
const submitNote = () => {
    //reset isNoteValid to true for proper validaton
    isNoteValid = true;
    //display required field messages for title and note body in note composer.
    noteTitleComposer.value === '' ? titleRequiredField[0].style.display = 'block' : titleRequiredField[0].style.display = 'none';
    noteBodyComposer.value === '' ? noteRequiredField[0].style.display = 'block' : noteRequiredField[0].style.display = 'none';
    //initialize the notes array in localStorage
    if(localStorage.getItem('notes') === null){
        localStorage.setItem('notes', '[]');
    }
    let notes = JSON.parse(localStorage.getItem('notes'));
    //validate the new note with all of the existing notes so as to confirm the new note is not a duplicate
    notes.forEach(validateNewNote);
    //save the new note if it is valid and not empty
    if(isNoteValid && noteTitleComposer.value !== '' && noteBodyComposer.value !== ''){
        notes.push({
            noteTitle: noteTitleComposer.value,         
            noteBody: noteBodyComposer.value, 
            bold: noteBodyComposer.style.fontWeight, 
            italic: noteBodyComposer.style.fontStyle, 
            color: noteBodyComposer.style.color, 
            bgColor: noteBodyComposer.style.backgroundColor,
            fontSize: noteBodyComposer.style.fontSize
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
const saveNoteEdits = () => {
    //display required field messages for title and note body in note editor.
    noteTitleEditor.value === '' ? titleRequiredField[1].style.display = 'block' : titleRequiredField[1].style.display = 'none';
    noteBodyEditor.value === '' ? noteRequiredField[1].style.display = 'block' : noteRequiredField[1].style.display = 'none';
    //edit the changes if title and body are not empty
    if(noteTitleEditor.value !== '' && noteBodyEditor.value !== ''){
        let notes = JSON.parse(localStorage.getItem('notes'));
        notes.forEach((note)=>{
            if(note.noteTitle === noteTitleEditor.value){
                note.noteTitle = noteTitleEditor.value,         
                note.noteBody = noteBodyEditor.value, 
                note.bold = noteBodyEditor.style.fontWeight, 
                note.italic = noteBodyEditor.style.fontStyle, 
                note.color = noteBodyEditor.style.color, 
                note.bgColor = noteBodyEditor.style.backgroundColor,
                note.fontSize = noteBodyEditor.style.fontSize
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
const deletePreviousNote = event => {
    //get the title of note selected for deleting
    let [previousNoteTitle,] = event.target.parentNode.children;
    console.log(previousNoteTitle);
    let notes = JSON.parse(localStorage.getItem('notes'));
    //search for the note in localStorage and delete it
    notes.forEach((note)=>{
        if(note.noteTitle === previousNoteTitle.innerHTML){
            let index = notes.indexOf(note);
            console.log(index);
            notes.splice(index,1);
        }
    });
    //update the new array and relaod
    localStorage.setItem('notes',JSON.stringify(notes));
    location.reload();
}

/**
 * cancelNote takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Cancel" button in note composer/note editor.
 * This function takes the user back to home page from note editor/note composer.
 */
const cancelNote = () => {
    //brings back the user to home page
    noteComposer.style.display = 'none';
    noteEditor.style.display = 'none';
    yourNotes.style.display = 'block';
    createNoteButton.style.display = 'block';
    location.reload(); 
}

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
noteBodyComposer.addEventListener('input',validateInput);
noteBodyEditor.addEventListener('input',validateInput);
noteTitleComposer.addEventListener('input',validateTitle);

