import { TxtNote } from './note-types/notes-text-note.jsx'
import { ImgNote } from './note-types/notes-img-note.jsx'
import { notesService } from '../services/notes.service.js'

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

    getNoteComponent() {
        const { type } = this.props.note
        if (type === 'note-txt') return <TxtNote {...this.props} onDelete={this.onDelete} />
        if (type === 'note-img') return <ImgNote {...this.props} onDelete={this.onDelete} />
    }


    render() {
        return <section className="dynamic-note">
            {this.getNoteComponent()}
        </section>
    }
}