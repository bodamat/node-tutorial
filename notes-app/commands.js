const yargs = require("yargs");
const notes = require("./notes");

yargs.command('add', 'Add a new note', {
        title: {
            alias: 't',
            description: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            alias: 'b',
            description: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    function (argv) {
        notes.addNote(argv.title, argv.body)
    }
)

yargs.command('remove', 'Remove a note',
    {
        title: {
            alias: 't',
            description: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    function (argv) {
        notes.removeNote(argv.title)
    }
)

yargs.command('list', 'Listing all notes',
    function () {
        notes.listNotes();
    }
)

yargs.command('read', 'Read a note',
    {
        title: {
            alias: 't',
            description: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    function (argv) {
        notes.readNote(argv.title);
    }
)

yargs.parse()
