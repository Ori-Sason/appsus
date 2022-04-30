import { notesService } from '../../services/notes.service.js'
import { NoteBtns } from '../note-btns.jsx'

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
const mic = new speechRecognition()

export class VoiceNote extends React.Component {
    state = {
        note: null,
        isListening: false
    }

    componentDidMount() {
        mic.continuous = true
        mic.interimResults = true
        mic.lang = 'en-US'
        this.setState({ note: this.props.note })
    }

    handleListen = () => {
        if (this.state.isListening) {
            mic.start()
            mic.onend = () => {
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                this.onFormSubmit()
            }
        }

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')

            this.setNote(transcript)
            mic.onerror = event => {
                // console.log(event.error)
            }
        }
    }

    setNote = (transcript) => {
        this.setState((prevState) => ({ note: notesService.copyAndUpdateNote(prevState.note, 'txt', transcript) }))
    }

    onToggleVoice = (ev) => {
        ev.stopPropagation
        this.setState({ isListening: !this.state.isListening }, () => this.handleListen())
    }

    
    
    onInputChange = (ev) => {
        const { name, value } = ev.target
        this.setState((prevState) => ({ note: notesService.copyAndUpdateNote(prevState.note, name, value) }))
    }

    onFormSubmit = (ev) => {
        if (ev) ev.preventDefault()

        if (this.props.isYoutube) {
            this.props.onUpdate({ ...this.state.note.info })
            this.props.onClose()
            return
        }

        if (this.props.isCreate) {
            notesService.createNote('note-txt', { ...this.state.note.info })
                .then(this.props.onClose).then(this.props.onUpdate)
        } else {
            notesService.updateNote(({ ...this.props.note, info: { ...this.state.note.info } }))
                .then(this.props.onClose)
        }
    }

    render() {
        const { note, isListening } = this.state
        if (!note) return <React.Fragment></React.Fragment>

        const { isPreview, isYoutube } = this.props
        const { title, txt } = note.info

        const txtPlaceholder = 'Click the button below and speak (supports English)'

        return <section className="voice-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <div className="backlog-container">
                    <div className={isPreview ? 'backlog' : ''}></div>
                    {!isPreview && <input className="no-focus-visible" type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} autoComplete="off" />}
                    {!isPreview && <input className="no-focus-visible" type="text" name="txt" placeholder={txtPlaceholder} value={txt} onChange={this.onInputChange} autoComplete="off" disabled />}

                    {isPreview && <p className="title">{title}</p>}
                    {isPreview && <p className="txt">{txt}</p>}
                </div>
                <button type="button" title="Record" className="note-btn img-mic clean-btn" onClick={(ev) => this.onToggleVoice(ev)}></button>
                <NoteBtns {...this.props} noteId={note.id} />
            </form>
        </section>
    }
}