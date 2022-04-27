import { storageService } from '../../../services/storage.service.js'

const NOTES_STORAGE_KEY = 'notesDB'

export const notesService = {
    query,
}

const notes = [
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
] /** FIX */

const note = {
    id: 0,
    type: ['note-txt', 'note-img', 'note-video', 'note-todos'], //, 'note-audio', 'note-canvas', 'note-map'
    isPinned: false,
    title: '',
    info: {
        txt: 'text',
        url: '', //for images and videos
        todos: [{ txt: '', doneAt: null }]
    },
    labels: []
} /** FIX */

function query() {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
        notes = _createNotes()
        _saveToStorage(notes)
    }

    return Promise.resolve(notes)
}

function _createNote() {
    query().then(notes => ({
        id: notes.length === 0 ? 0 : notes[notes.length - 1].id + 1,
        type: 'note-txt',
        isPinned: false,
        title: '',
        info: {
            txt: '',
        },
        labels: []
    }))
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_STORAGE_KEY)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_STORAGE_KEY, notes)
}