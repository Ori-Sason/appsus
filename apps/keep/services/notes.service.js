import { storageService } from '../../../services/storage.service.js'

const NOTES_STORAGE_KEY = 'notesDB'

export const notesService = {
    query,
    getNoteById,
    createNote,
    updateNote,
}

const note = {
    id: 0,
    type: ['note-txt', 'note-img', 'note-video', 'note-todos'], //, 'note-audio', 'note-canvas', 'note-map'
    isPinned: false,
    info: {
        title: '',
        txt: 'text',
        url: '', //for images and videos
        todos: [{ txt: '', doneAt: null }],
        labels: []
    },
} /** FIX */

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
        const note = notes.find(note => note.id === +noteId)
        return note
    })
}

function createNote(type, info) {
    return query().then(notes => {
        const note = {
            id: notes === null || notes.length === 0 ? 0 : notes[notes.length - 1].id + 1, //** FIX - NOT NEED NULL */
            type,
            isPinned: false,
            info,
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



function _createNotes() {
    return [
        {
            id: 0,
            type: "note-txt",
            isPinned: true,
            info: { txt: "Fullstack Me Baby!" }
        },
        {
            id: 1,
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: { backgroundColor: "#00d" }
        },
        {
            id: 2,
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
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