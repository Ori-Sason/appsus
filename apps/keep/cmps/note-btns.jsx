import { eventBusService } from '../../../services/event.bus.service.js'

export class NoteBtns extends React.Component {

    state = {
        isClrPickerOpen: true,
    }

    onOpenColorPicker = (ev) => {
        eventBusService.emit('notes-toggle-color', ({ ev, noteId: this.props.noteId }))
    }

    render() {
        const { isPreview, isCreate, onUpdate, onClose, onDelete, onToMail, onDuplicate, onArchive, onReminder, noteId } = this.props

        return <section className="note-btns">
            {!isCreate && <button type="button" title="Reminder" className="note-btn img-reminder clean-btn" onClick={(ev) => onReminder(ev, noteId)}></button>}
            {!isCreate && <button type="button" title="Background color" className="note-btn img-color clean-btn" onMouseDown={this.onOpenColorPicker} onClick={(ev) => ev.stopPropagation()}></button>}

            {!isCreate && <button title="Archive" type="button" className="note-btn img-archive clean-btn" onClick={(ev) => onArchive(ev, noteId)}></button>}
            {!isCreate && <button title="Duplicate note" type="button" className="note-btn img-duplicate clean-btn" onClick={(ev) => onDuplicate(ev, noteId)}></button>}
            {isPreview && <button title="Send to mail" type="button" className="note-btn img-mail clean-btn" onClick={(ev) => onToMail(ev, noteId)}></button>}
            {!isCreate && <button title="Delete" type="button" className="note-btn img-bin clean-btn" onClick={(ev) => onDelete(ev, noteId)}></button>}

            {!isPreview && <button title="Close" type="button" className={`note-btn btn-text clean-btn`} onClick={onClose}>Close</button>}
            {!isPreview && <button title="Submit" type="submit" className={`note-btn btn-text clean-btn`} onClick={onUpdate}>{isCreate ? 'Create' : 'Save'}</button>}
        </section >
    }
}