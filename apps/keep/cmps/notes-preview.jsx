import { DynamicNote } from './dynamic-note.jsx'

const { withRouter } = ReactRouterDOM

function _NotePreview({ note, history }) {
    function onEditNote(noteId) {
        history.push(`/keep/list/${noteId}`)
    }

    return <section className="note-preview" onClick={() => onEditNote(note.id)}>
        <DynamicNote note={note} isPreview={true} />
    </section>
}

export const NotePreview = withRouter(_NotePreview)