import { TxtNote } from './note-types/notes-text-note.jsx'

export function DynamicNote(props) {
    function getNoteComponent() {
        const { type } = props.note
        if (type === 'note-txt') return <TxtNote {...props} />
    }

    return <section className="dynamic-note">
        {getNoteComponent()}
    </section>
}