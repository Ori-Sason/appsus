import { notesService } from '../../services/notes.service.js'
import { NoteBtns } from '../note-btns.jsx'

export class VidNote extends React.Component {
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
            notesService.createNote('note-vid', { ...this.state.note.info })
                .then(this.props.onClose).then(this.props.onUpdate)
        } else {
            notesService.updateNote(({ ...this.props.note, info: { ...this.state.note.info } }))
                .then(this.props.onClose)
        }
    }

    render() {
        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>

        const { isPreview } = this.props
        const { title, url } = note.info

        return <section className="vid-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <iframe src={url} height="800"></iframe>
                <div className='backlog-container' >
                    <div className={isPreview ? 'backlog' : ''}></div>
                    <input className="no-focus-visible" type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} autoComplete="off"/>
                </div>
                <NoteBtns {...this.props} noteId={note.id} />
            </form>
        </section>
    }
}