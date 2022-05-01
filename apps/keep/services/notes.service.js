import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../../mail/services/mail.service.js'

const NOTES_STORAGE_KEY = 'notesDB'

export const notesService = {
    query,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    copyAndUpdateNote,
    duplicateNote,
    reminder,
    toggleNoteProperty,
    changeBgColor,
    addNoteFromMail,
}

function query() {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
        notes = _createNotes()
        _saveToStorage(notes)
    }

    return Promise.resolve(notes)
}

function getNoteById(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        return note
    })
}

function createNote(type, info) {
    return query().then(notes => {
        const note = {
            id: utilService.makeId(),
            type,
            reminder: false,
            isPinned: false,
            isArchived: false,
            isDeleted: false,
            info,
            style: { backgroundColor: 'none' }
        }
        notes.push(note)
        _saveToStorage(notes)
        return note
    })
}

function updateNote(updatedNote) {
    return query().then(notes => {
        const noteIdx = notes.findIndex(note => note.id === updatedNote.id)
        notes[noteIdx] = updatedNote
        _saveToStorage(notes)
    })
}

function deleteNote(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)

        if (!note.isDeleted) {
            note.isDeleted = true
            _saveToStorage(notes)
            return notes
        }

        const newNotes = notes.filter(note => note.id !== noteId)
        _saveToStorage(newNotes)
        return newNotes
    })
}

function reminder(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        /** FIX TO DATETIME PICKER */
        let { reminder } = note
        console.log(reminder)
        reminder = reminder ? 0 : Date.now()
        note.reminder = reminder
        _saveToStorage(notes)
        return note
    })
}

function toggleNoteProperty(noteId, property) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        note[property] = !note[property]
        _saveToStorage(notes)
        return note
    })
}

function copyAndUpdateNote(note, key, value) {
    const newNote = { ...note }
    const newInfo = { ...note.info, [key]: value }
    newNote.info = newInfo
    return newNote
}

function duplicateNote(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        const duplicate = JSON.parse(JSON.stringify(note))
        duplicate.id = utilService.makeId()
        notes.push(duplicate)
        _saveToStorage(notes)
        return notes
    })
}

function changeBgColor(noteId, color) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        note.style.backgroundColor = color
        _saveToStorage(notes)
        return notes
    })
}

function addNoteFromMail(mailId) {
    if (!mailId) return Promise.resolve(null)
    const mail = mailService.getMailById(mailId)
    if (!mail) return Promise.resolve(null)

    let { noteType, img } = mail

    if (noteType === 'note-todos') noteType = 'note-txt'
    else if (!noteType) {
        if (img) noteType = 'note-img'
        else noteType = 'note-txt'
    }

    const info = {
        title: mail.subject,
        txt: mail.body,
        url: img || ''
    }

    return createNote(noteType, info).then(note => note.id)
}

function _createNotes() {
    return [
        {
            "id": 'YI5PVj',
            "type": "note-img",
            "reminder": Date.now(),
            "isPinned": true,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "url": "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80",
                "title": "We can take some notes!"
            },
            "style": {
                "backgroundColor": "#fdcfe8"
            }
        },
        {
            "id": 'LZYc74',
            "type": "note-todos",
            "reminder": 0,
            "isPinned": false,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Buying list",
                "txt": "",
                "url": null,
                "todos": [
                    {
                        "id": 0,
                        "txt": "17 beers",
                        "isChecked": false
                    },
                    {
                        "id": 1,
                        "txt": "17 muffins",
                        "isChecked": false
                    },
                    {
                        "id": 2,
                        "txt": "17 tomatoes / tomatos",
                        "isChecked": false
                    },
                    {
                        "id": 3,
                        "txt": "17 breads",
                        "isChecked": false
                    },
                    {
                        "id": 4,
                        "txt": "17 coffee beans",
                        "isChecked": false
                    },
                    {
                        "id": 5,
                        "txt": "17 toys",
                        "isChecked": false
                    },
                    {
                        "id": 6,
                        "txt": "17 shoes",
                        "isChecked": false
                    },
                    {
                        "id": 7,
                        "txt": "17 mics",
                        "isChecked": false
                    },
                    {
                        "id": 8,
                        "txt": "17 tickets",
                        "isChecked": false
                    },
                    {
                        "id": 9,
                        "txt": "17 pans",
                        "isChecked": false
                    }
                ]
            },
            "style": {
                "backgroundColor": "none"
            }
        },
        {
            "id": 'rLz8Sh',
            "type": "note-txt",
            "reminder": Date.now(),
            "isPinned": false,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Get back to JavaScript",
                "txt": "JavaScript often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.",
                "url": ""
            },
            "style": {
                "backgroundColor": "#ccff90"
            }
        },
        {
            "id": 'dhfCnx',
            "type": "note-todos",
            "reminder": 0,
            "isPinned": true,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Missions for today",
                "txt": "",
                "url": null,
                "todos": [
                    {
                        "id": 0,
                        "txt": "Call your aunt",
                        "isChecked": false
                    },
                    {
                        "id": 1,
                        "txt": "Count until 17",
                        "isChecked": false
                    },
                    {
                        "id": 2,
                        "txt": "Look at the mirror - this is natural",
                        "isChecked": false
                    },
                    {
                        "id": 3,
                        "txt": "Promise (!) that tomorrow I'll start running",
                        "isChecked": false
                    },
                    {
                        "id": 4,
                        "txt": "Get some beers",
                        "isChecked": false
                    },
                    {
                        "id": 5,
                        "txt": "Finish this",
                        "isChecked": false
                    }
                ]
            },
            "style": {
                "backgroundColor": "#d7aefb"
            }
        },
        {
            "id": 'HZ1BKF',
            "type": "note-vid",
            "reminder": 0,
            "isPinned": true,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Stay tuned",
                "txt": "https://www.youtube.com/watch?v=TNhaISOUy6Q",
                "url": "https://www.youtube.com/embed/TNhaISOUy6Q",
                "todos": []
            },
            "style": {
                "backgroundColor": "#cbf0f8"
            }
        },
        {
            "id": 'hNHyIk',
            "type": "note-txt",
            "reminder": Date.now(),
            "isPinned": false,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Call Alex!",
                "txt": "",
                "url": null,
                "todos": []
            },
            "style": {
                "backgroundColor": "#f28b82"
            }
        },
        {
            "id": 'QYxRpp',
            "type": "note-txt",
            "reminder": 0,
            "isPinned": false,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Call Alex once more!",
                "txt": "",
                "url": null,
                "todos": []
            },
            "style": {
                "backgroundColor": "none"
            }
        },
        {
            "id": '4Hrbc4',
            "type": "note-txt",
            "reminder": 0,
            "isPinned": false,
            "isArchived": false,
            "isDeleted": false,
            "info": {
                "title": "Add labels to Appsus notes",
                "txt": "Use the custom color picker",
                "url": null,
                "todos": []
            },
            "style": {
                "backgroundColor": "#fff475"
            }
        },
        {
            "id": 'Ge8ahK',
            "type": "note-txt",
            "reminder": 0,
            "isPinned": false,
            "isArchived": false,
            "isDeleted": true,
            "info": {
                "title": "I have been deleted 🤔",
                "txt": "",
                "url": null,
                "todos": []
            },
            "style": {
                "backgroundColor": "#cbf0f8"
            }
        },
        {
            "id": 'TsiDyv',
            "type": "note-txt",
            "reminder": 0,
            "isPinned": false,
            "isArchived": true,
            "isDeleted": false,
            "info": {
                "title": "Learn jQuery?!",
                "txt": "",
                "url": null,
                "todos": []
            },
            "style": {
                "backgroundColor": "#d7aefb"
            }
        },
        {
            "id": 'gbEI8z',
            "type": "note-todos",
            "reminder": 0,
            "isPinned": false,
            "isArchived": true,
            "isDeleted": false,
            "info": {
                "title": "Appsus notes",
                "txt": "",
                "url": null,
                "todos": [
                    {
                        "id": 0,
                        "txt": "CRUD",
                        "isChecked": true
                    },
                    {
                        "id": 1,
                        "txt": "note types: text, image, video, todos",
                        "isChecked": true
                    },
                    {
                        "id": 2,
                        "txt": "Background color",
                        "isChecked": true
                    },
                    {
                        "id": 3,
                        "txt": "Filter by type (URL pages)",
                        "isChecked": true
                    },
                    {
                        "id": 4,
                        "txt": "Pinning a note",
                        "isChecked": true
                    },
                    {
                        "id": 5,
                        "txt": "Sending a note to Appsus email",
                        "isChecked": true
                    },
                    {
                        "id": 6,
                        "txt": "Drag and drop",
                        "isChecked": false
                    },
                    {
                        "id": 7,
                        "txt": "More types: audio, canvas, map",
                        "isChecked": false
                    },
                    {
                        "id": 8,
                        "txt": "Recording a note",
                        "isChecked": true
                    }
                ]
            },
            "style": {
                "backgroundColor": "#d7aefb"
            }
        }
    ]
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_STORAGE_KEY)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_STORAGE_KEY, notes)
}