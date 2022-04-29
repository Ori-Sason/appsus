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

    updateAndClose = (promise) => {
        this.setState({ note: null })
        if (this.props.onUpdate) this.props.onUpdate()
        if (this.props.onClose) this.props.onClose()
    }

    getNoteComponent() {
        const { type } = this.props.note
        if (type === 'note-txt') return <TxtNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} />
        if (type === 'note-img') return <ImgNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} />
        if (type === 'note-vid') return <VidNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} />
        if (type === 'note-todos') return <TodoNote {...this.props} onDelete={this.onDelete} onDuplicate={this.onDuplicate} onArchive={this.onArchive} onReminder={this.onReminder} />
    }


    render() {
        return <section className="dynamic-note">
            {this.getNoteComponent()}
        </section>
    }
}