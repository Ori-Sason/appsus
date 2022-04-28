export function NoteBtns({ isPreview, isCreate, onClose, onDelete, noteId }) {
    return <section className="note-btns">
        <button type="button" className="note-btn img-reminder clean-btn"></button>
        <button type="button" className="note-btn img-color clean-btn"></button>
        <button type="button" className="note-btn img-img-btn clean-btn"></button>
        {!isCreate && <button type="button" className="note-btn img-bin clean-btn" onClick={(ev) => {ev.stopPropagation(); onDelete(noteId)}}></button>}
        <button type="button" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`} onClick={onClose}>Close</button>
        <button type="submit" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`}>{isCreate ? 'Create' : 'Save'}</button>
    </section>
}