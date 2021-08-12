const chalk = require('chalk')
const fs = require('fs')

function getNotes() {
    return 'Your notes...';
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => {
        return note.title === title
    })

    if (duplicateNotes.length !== 0) {
        console.log('Note with this title exist!');
        return;
    }

    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes);
    console.log('New note added!');
}

const removeNote = function (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.bgGreen('Note removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.bgRed('Note with this title doesn\'t exist!'));
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return  []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
};
