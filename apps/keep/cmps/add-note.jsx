import { notesService } from '../services/notes.service.js'
// import { TxtNote } from './note-types/notes-text-note.jsx'
import { DynamicNote } from './dynamic-note.jsx'

export class AddNote extends React.Component {

    state = {
        isOpen: false,
        type: null,
    }

    onToggleOpen = (type) => {
        this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen, type }))
    }

    render() {
        const { isOpen, type } = this.state

        return <section className='add-note'>
            {!isOpen &&
                <React.Fragment>
                    <p onClick={() => this.onToggleOpen('note-txt')}>Take a note...</p>
                    <button className="note-btn img-checkbox-checked clean-btn"></button>
                    <button className="note-btn img-img-btn clean-btn"></button>
                    <button className="note-btn img-youtube clean-btn"></button>
                </React.Fragment>
            }

            {isOpen && <React.Fragment>
                <DynamicNote note={{ type: type, info: { title: '', txt: '' } }} onClose={() => this.onToggleOpen(null)} isCreate={true} />
            </React.Fragment>}
        </section>
    }
}