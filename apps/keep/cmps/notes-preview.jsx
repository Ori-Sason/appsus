import { DynamicNote } from './dynamic-note.jsx'

const { withRouter } = ReactRouterDOM

function _NotePreview(props) {
    function onEditNote(noteId) {
        props.history.push(`/keep/list/${noteId}`)
    }

    return <section className="note-preview" onClick={() => onEditNote(props.note.id)}>
        <DynamicNote {...props} isPreview={true}/>
    </section>
}

export const NotePreview = withRouter(_NotePreview)