import { notesService } from '../services/notes.service.js'
import { TxtNote } from './note-types/notes-text-note.jsx'
import { ImgNote } from './note-types/notes-img-note.jsx'
import { VidNote } from './note-types/notes-vid-note.jsx'
import { TodoNote } from './note-types/notes-todos-note.jsx'

export class DynamicNote extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    onDelete = (noteId) => {
        notesService.deleteNote(noteId)
            .then(() => this.setState({ note: null }))
            .then(this.props.onUpdate)
            .then(this.props.onClose)
    }

    onDuplicate = (noteId) => {
        notesService.duplicateNote(noteId)
            .then(() => this.setState({ note: null }))
            .then(this.props.onUpdate)
            .then(this.props.onClose)
    }

    getNoteComponent() {
        const { type } = this.props.note
        if (type === 'note-txt') return <TxtNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} />
        if (type === 'note-img') return <ImgNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} />
        if (type === 'note-vid') return <VidNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} />
        if (type === 'note-todos') return <TodoNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} />
    }


    render() {
        return <section className="dynamic-note">
            {this.getNoteComponent()}
        </section>
    }
}