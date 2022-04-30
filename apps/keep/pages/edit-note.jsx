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
        notesService.getNoteById(noteId)
            .then((note) => this.setState({ note }))
    }

    onClose = () => {
        this.setState({ note: null }, () => {
            this.props.history.push('/keep')
            this.props.onReset()
            this.props.onUpdate()
        })

    }

    render() {
        const { note } = this.state
        if (!note) return <React.Fragment ></React.Fragment>

        return <section className="edit-note">
            <div className="backlog" onClick={(ev) => {ev.stopPropagation; this.onClose()}}></div>
            {this.props.match.params.noteId}
            <DynamicNote note={note} isPreview={false} onClose={this.onClose} />
        </section>
    }
}