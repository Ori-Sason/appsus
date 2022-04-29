import { storageService } from '../../../services/storage.service.js'

const NOTES_STORAGE_KEY = 'notesDB'

export const notesService = {
    query,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    copyAndUpdateNote,
    duplicateNote,
    pinNote,
    reminder,
    archiveNote,
    changeBgColor,
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

function pinNote(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        note.isPinned = !note.isPinned
        _saveToStorage(notes)
        return note
    })
}

function reminder(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        /** FIX TO DATETIME PICKER */
        note.reminder = !note.reminder
        _saveToStorage(notes)
        return notes
    })
}

function archiveNote(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        note.isArchived = !note.isArchived
        _saveToStorage(notes)
        return notes
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
        duplicate.id = notes === null || notes.length === 0 ? 0 : notes[notes.length - 1].id + 1, //** FIX - NOT NEED NULL */
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

function _createNotes() {
    return [
        {
            id: 0,
            type: "note-txt",
            reminder: true,
            isPinned: true,
            isArchived: false,
            isDeleted: false,
            info: { title: '', txt: "Fullstack Me Baby!" },
            style: { backgroundColor: 'none' }
        },
        {
            id: 1,
            type: "note-img",
            reminder: true,
            isPinned: true,
            isArchived: false,
            isDeleted: false,
            info: {
                url: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80",
                title: "notes"
            },
            style: { backgroundColor: 'none' }
        },
        {
            id: 2,
            type: "note-todos",
            reminder: true,
            isPinned: true,
            isArchived: false,
            isDeleted: false,
            info: {
                title: "Get my stuff together",
                todos: [{ id: 0, txt: "Driving liscence", isChecked: true }, { id: 1, txt: "Coding power", isChecked: false }]
            },
            style: { backgroundColor: 'none' }
        },
        {
            id: 3,
            type: "note-vid",
            reminder: true,
            isPinned: true,
            isArchived: false,
            isDeleted: false,
            info: {
                title: "Get my stuff together",
                url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            },
            style: { backgroundColor: 'none' }
        },
    ]
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_STORAGE_KEY)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_STORAGE_KEY, notes)
}