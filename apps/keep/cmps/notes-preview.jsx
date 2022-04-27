import { TxtNote } from './note-types/notes-text-note.jsx'

export function NotePreview({ note }) {
    const { type, info } = note
    function onOpenModal(noteId){
        console.log(noteId)
    }

    return <section className="note-preview" >
        <TxtNote note={note} isPreview={true} onOpenModal={onOpenModal} />
    </section>
}