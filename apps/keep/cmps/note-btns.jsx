export function NoteBtns({ isPreview, isCreate, onUpdate, onClose, onDelete, onDuplicate, onArchive, onReminder, noteId }) {
    return <section className="note-btns">
        <button type="button" className="note-btn img-reminder clean-btn" onClick={(ev) => onReminder(ev, noteId)}></button>
        <button type="button" className="note-btn img-color clean-btn"></button>
        {!isCreate && <button type="button" className="note-btn img-archive clean-btn" onClick={(ev) => onArchive(ev, noteId)}></button>}
        {!isCreate && <button type="button" className="note-btn img-duplicate clean-btn" onClick={(ev) => onDuplicate(ev, noteId)}></button>}
        {!isCreate && <button type="button" className="note-btn img-bin clean-btn" onClick={(ev) => onDelete(ev, noteId)}></button>}
        <button type="button" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`} onClick={onClose}>Close</button>
        <button type="submit" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`} onClick={onUpdate}>{isCreate ? 'Create' : 'Save'}</button>
    </section>
}