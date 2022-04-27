import { notesService } from '../services/notes.service.js'
import { TxtNote } from './note-types/notes-text-note.jsx'

export class AddNote extends React.Component {

    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    }

    onCreateNote = ({ type, info }) => {
        notesService.createNote(type, info).then(this.onToggleOpen)
    }

    render() {
        const { isOpen } = this.state

        return <section className='add-note'>
            {!isOpen &&
                <React.Fragment>
                    <p onClick={this.onToggleOpen}>Take a note...</p>
                    <button className="note-btn img-checkbox-checked clean-btn"></button>
                    <button className="note-btn img-img-btn clean-btn"></button>
                    <button className="note-btn img-youtube clean-btn"></button>
                </React.Fragment>
            }

            {isOpen && <React.Fragment>
                <TxtNote note={{ info: { txt: '', title: '' } }} onClose={this.onToggleOpen} onCreateNote={this.onCreateNote} />
            </React.Fragment>}
        </section>
    }
}