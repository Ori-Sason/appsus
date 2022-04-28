import { notesService } from '../services/notes.service.js'
// import { TxtNote } from './note-types/notes-text-note.jsx'
import { DynamicNote } from './dynamic-note.jsx'

export class AddNote extends React.Component {

    state = {
        isOpen: false,
        type: null,
        src: null,
    }

    /** FIX - IN onToggle AND onSelectImg MABY I DONT NEED TO USE prevState */

    onToggleOpen = (type) => {
        this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen, type, src: null }))
    }

    onSelectImg = (ev) => {

        const loadImageFromInput = (ev, onImageReady) => {
            var reader = new FileReader()

            reader.onload = (event) => {
                var img = new Image()
                img.src = event.target.result
                img.onload = onImageReady.bind(null, img)
            }
            reader.readAsDataURL(ev.target.files[0])
        }

        const renderImg = (img) => {
            this.setState((prevState) => ({ ...prevState, type: 'note-img', isOpen: true, url: img.src }))
        }

        loadImageFromInput(ev, renderImg)
    }

    render() {
        const { isOpen, type, url } = this.state

        return <section className='add-note'>
            {!isOpen &&
                <React.Fragment>
                    <p onClick={() => this.onToggleOpen('note-txt')}>Take a note...</p>
                    <button className="note-btn img-checkbox-checked clean-btn"></button>
                    <div className='mail-invisible-btn'>
                        <button className="note-btn img-img-btn clean-btn"></button>
                        <input type="file" onChange={this.onSelectImg} className='invis-input' accept="image/png, image/gif, image/jpeg" />
                    </div>
                    <button className="note-btn img-youtube clean-btn"></button>
                </React.Fragment>
            }

            {isOpen && <React.Fragment>
                <DynamicNote note={{ type: type, info: { title: '', txt: '', url } }} onClose={() => this.onToggleOpen(null)} isCreate={true} onUpdate={this.props.onUpdate}/>
            </React.Fragment>}
        </section>
    }
}