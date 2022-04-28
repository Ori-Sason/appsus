import { notesService } from '../../services/notes.service.js'
import { NoteBtns } from '../note-btns.jsx'

export class ImgNote extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    onInputChange = (ev) => {
        const { name, value } = ev.target
        this.setState((prevState) => ({ note: notesService.copyAndUpdateNote(prevState.note, name, value) }))
    }

    onFormSubmit = (ev) => {
        ev.preventDefault()
        if (this.props.isCreate) {
            notesService.createNote('note-img', { ...this.state.note.info })
                .then(this.props.onClose).then(this.props.onUpdate)
        } else {
            notesService.updateNote(({ ...this.props.note, info: { ...this.state.note.info } }))
                .then(this.props.onClose)
        }
    }

    render() {
        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>

        const { isPreview, isCreate, onClose, onDelete } = this.props
        const { title, url } = note.info

        return <section className="img-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <img src={url} />
                <input className={isPreview && !title ? 'hide' : ''} type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} />
                <NoteBtns isPreview={isPreview} isCreate={isCreate} onClose={onClose} onDelete={onDelete} noteId={note.id} />
            </form>
        </section>
    }
}