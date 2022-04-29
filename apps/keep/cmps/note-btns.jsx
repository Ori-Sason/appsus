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
            <button type="button" className="note-btn img-reminder clean-btn" onClick={(ev) => onReminder(ev, noteId)}></button>
            <button type="button" className="note-btn img-color clean-btn" onMouseDown={this.onOpenColorPicker} onClick={(ev) => ev.stopPropagation()}></button>

            {!isCreate && <button type="button" className="note-btn img-archive clean-btn" onClick={(ev) => onArchive(ev, noteId)}></button>}
            {!isCreate && <button type="button" className="note-btn img-duplicate clean-btn" onClick={(ev) => onDuplicate(ev, noteId)}></button>}
            {isPreview && <button type="button" className="note-btn img-mail clean-btn" onClick={(ev) => onToMail(ev, noteId)}></button>}
            {!isCreate && <button type="button" className="note-btn img-bin clean-btn" onClick={(ev) => onDelete(ev, noteId)}></button>}

            {!isPreview && <button type="button" className={`note-btn btn-text clean-btn`} onClick={onClose}>Close</button>}
            {!isPreview && <button type="submit" className={`note-btn btn-text clean-btn`} onClick={onUpdate}>{isCreate ? 'Create' : 'Save'}</button>}
        </section >
    }
}