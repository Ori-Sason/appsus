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

    onPinned = (ev, noteId) => {
        ev.stopPropagation();
        notesService.pinNote(noteId)
            .then(note => { this.setState({ note }) })
            .then(this.updateAndClose)
    }

    onReminder = (ev, noteId) => {
        ev.stopPropagation();
        /** LATER CHANGE TO DATETIME PICKER */
        notesService.reminder(noteId).then(this.updateAndClose)
    }

    onArchive = (ev, noteId) => {
        ev.stopPropagation();
        notesService.archiveNote(noteId).then(this.updateAndClose)
    }

    onDelete = (ev, noteId) => {
        ev.stopPropagation();
        notesService.deleteNote(noteId).then(this.updateAndClose)
    }

    onDuplicate = (ev, noteId) => {
        ev.stopPropagation();
        notesService.duplicateNote(noteId).then(this.updateAndClose)

    }

    updateAndClose = () => {
        if (this.props.onUpdate) this.props.onUpdate()
        if (this.props.onClose) this.props.onClose()
    }

    onToMail = (ev, noteId) => {
        ev.stopPropagation();
        console.log('sent')

        const urlSrcPrm = new URLSearchParams({ noteId })
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/mail/edit/:?${searchStr}`)
        // window.open(`/mail/edit/:?${ searchStr }`, '_blank') /* FOX - TRY IN NEW WINDOW */
    }

    getNoteComponent() {
        const { type } = this.props.note
        if (type === 'note-txt') return <TxtNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} onToMail={this.onToMail} />
        if (type === 'note-img') return <ImgNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} onToMail={this.onToMail} />
        if (type === 'note-vid') return <VidNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} onToMail={this.onToMail} />
        if (type === 'note-todos') return <TodoNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} onToMail={this.onToMail} />
    }


    render() {
        if (!this.state.note) return <React.Fragment></React.Fragment>

        const { id: noteId, isPinned, style } = this.state.note

        return <section className="dynamic-note" style={{ backgroundColor: style.backgroundColor}}>
            {!this.props.isCreate &&
                <button title={isPinned? 'Unpin': 'Pin'} type="button" className={`note-btn img-pin-${isPinned ? 'black' : 'empty'} clean-btn`}
                    onClick={(ev) => this.onPinned(ev, noteId)}>
                </button>
            }

            {this.getNoteComponent()}
        </section>
    }
}