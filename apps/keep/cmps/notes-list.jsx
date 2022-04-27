import { notesService } from '../services/notes.service.js'
import { NotePreview } from './notes-preview.jsx'

const { withRouter } = ReactRouterDOM

export class _NoteList extends React.Component {
    state = {
        notes: null,
        activeNoteId: null,
    }

    componentDidMount() {
        this.loadNotes()
    }


    loadNotes() {
        notesService.query().then(notes => this.setState((prevState) => ({ ...prevState, notes })))
    }

    render() {
        const { notes } = this.state
        if (!notes) return <p>Loading...</p>

        return <section className="notes-list">
            {notes.map(note => <NotePreview key={note.id} note={note} onUpdateNotes={this.loadNotes}/>)}
        </section>
    }
}

export const NoteList = withRouter(_NoteList)