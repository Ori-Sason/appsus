import { notesService } from '../services/notes.service.js'
import { NotePreview } from './notes-preview.jsx'

export class NoteList extends React.Component {
    render() {
        const { notes } = this.props
        if (!notes) return <p>Loading...</p>
        return <section className="notes-list">
            {notes.map(note => <NotePreview key={note.id} note={note} onUpdate={this.props.onUpdate} />)}
        </section>
    }
}