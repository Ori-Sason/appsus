import { storageService } from '../../../services/storage.service.js'

const NOTES_STORAGE_KEY = 'notesDB'

export const notesService = {
    query,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    copyAndUpdateNote
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

function deleteNote(noteId) {
    return query().then(notes => {
        const newNotes = notes.filter(note => note.id !== noteId)
        _saveToStorage(newNotes)
        return newNotes
    })
}

function copyAndUpdateNote(note, key, value) {
    const newNote = { ...note }
    const newInfo = { ...note.info, [key]: value }
    newNote.info = newInfo
    return newNote
}

function _createNotes() {
    return [
        {
            id: 0,
            type: "note-txt",
            isPinned: true,
            info: { title: '', txt: "Fullstack Me Baby!" }
        },
        {
            id: 1,
            type: "note-img",
            info: {
                url: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80",
                title: "notes"
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
        },
        {
            id: 3,
            type: "note-vid",
            info: {
                label: "Get my stuff together",
                url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            }
        },
    ]
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_STORAGE_KEY)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_STORAGE_KEY, notes)
}