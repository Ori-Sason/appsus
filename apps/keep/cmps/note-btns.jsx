export function NoteBtns({ isPreview, isCreate, onClose, onDelete, onDuplicate, noteId }) {
    return <section className="note-btns">
        <button type="button" className="note-btn img-reminder clean-btn"></button>
        <button type="button" className="note-btn img-color clean-btn"></button>
        {!isCreate && <button type="button" className="note-btn img-duplicate clean-btn" onClick={(ev) => {ev.stopPropagation(); onDuplicate(noteId)}}></button>}
        {!isCreate && <button type="button" className="note-btn img-bin clean-btn" onClick={(ev) => {ev.stopPropagation(); onDelete(noteId)}}></button>}
        <button type="button" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`} onClick={onClose}>Close</button>
        <button type="submit" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`}>{isCreate ? 'Create' : 'Save'}</button>
    </section>
}