import { TxtNote } from './note-types/notes-text-note.jsx'

export function DynamicNote({ note, isPreview }) {
    function getNoteComponent() {
        if (note.type === 'note-txt') return <TxtNote note={note} isPreview={isPreview} />
    }

    return <section className="dynamic-note">
        {getNoteComponent()}
    </section>
}