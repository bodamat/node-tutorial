const chalk = require('chalk')
const fs = require('fs')

function addNote (title, body) {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk.red('Note with this title exist!'));
        return;
    }

    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes);
    console.log(chalk.green('New note added!'));
}

 function removeNote (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('Note with this title doesn\'t exist!'));
    }
}

function listNotes() {
    console.log(chalk.yellow('Your notes:'));

    loadNotes().forEach((note, index) => {
        console.log(`${index + 1}: ${note.title}`);
    })
}

function readNote(title) {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (!note) {
        console.log(chalk.red('Note with title ') + chalk.bold(title) + chalk.red(' doesn\'t exist!'));
        return;
    }

    console.log(chalk.blue('Title: ') + note.title);
    console.log(chalk.yellow('Body: ') + note.body);
}

function saveNotes (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

function loadNotes () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return  []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};
