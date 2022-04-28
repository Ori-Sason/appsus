import { notesService } from '../services/notes.service.js'
import { NotePreview } from './notes-preview.jsx'

export class NoteList extends React.Component {
    state = {
        notes: null,
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes() {
        return notesService.query().then(notes => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state
        if (!notes) return <p>Loading...</p>
        return <section className="notes-list">
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
        </section>
    }
}