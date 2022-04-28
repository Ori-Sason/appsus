import { NotePreview } from './notes-preview.jsx'

export function NoteList({ notes, onUpdate }) {
    if (!notes) return <p>Loading...</p>
    return <section className="notes-list">
        {notes.map(note => <NotePreview key={note.id} note={note} onUpdate={onUpdate} />)}
    </section>
}