import { notesService } from '../services/notes.service.js'
import { DynamicNote } from '../cmps/dynamic-note.jsx'

export class EditNote extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNote()
        }
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        // notesService.getNoteById(noteId)
    }

    render() {
        return <section className="edit-note">
            <div className="backlog"></div>
            {this.props.match.params.noteId}
            {/* <DynamicNote note={note} isPreview={false} /> */}
        </section>
    }
}