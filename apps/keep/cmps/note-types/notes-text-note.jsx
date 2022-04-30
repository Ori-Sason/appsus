import { notesService } from '../../services/notes.service.js'
import { NoteBtns } from '../note-btns.jsx'

export class TxtNote extends React.Component {
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
            notesService.createNote('note-txt', { ...this.state.note.info })
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
        const { title, txt } = note.info

        return <section className="text-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <div className="backlog-container">
                    <div className={isPreview ? 'backlog' : ''}></div>
                    {!isPreview && <input className="no-focus-visible" type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} />}
                    {!isPreview && <input className="no-focus-visible" type="text" name="txt" placeholder="Take a note..." value={txt} onChange={this.onInputChange} />}
                    
                    {isPreview && <p className="title">{title}</p>}
                    {isPreview && <p className="txt">{txt}</p>}
                    
                    {/* <textarea className={isPreview && !txt ? 'hide' : ''} name="txt" placeholder="Take a note..." value={txt} onChange={this.onInputChange} /> */}
                </div>
                <NoteBtns {...this.props} noteId={note.id} />
            </form>
        </section>
    }
}