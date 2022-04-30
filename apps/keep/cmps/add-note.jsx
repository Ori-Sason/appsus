import { notesService } from '../services/notes.service.js'
// import { TxtNote } from './note-types/notes-text-note.jsx'
import { DynamicNote } from './dynamic-note.jsx'

export class AddNote extends React.Component {

    state = {
        isOpen: false,
        type: null,
        url: null,
        todos: [],
        isYoutube: false
    }

    /** FIX - IN onToggle AND onSelectImg MABY I DONT NEED TO USE prevState */

    onToggleOpen = (type) => {
        this.setState((prevState) => ({
            ...prevState,
            isOpen: !prevState.isOpen,
            type: type === 'note-vid' ? 'note-txt' : type,
            src: null,
            isYoutube: type === 'note-vid'
        }))
    }

    onSelectTodo = () => {
        this.setState((prevState) => ({ ...prevState, type: 'note-todos', isOpen: true }))
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


    onYoutubeSubmit = (info) => {
        const url = info.txt
        if (!url || !url.includes('youtube.com/watch?v=')) return
        const params = url.split('?')[1]
        const searchParams = new URLSearchParams(params)
        const vidId = searchParams.get('v')
        if (!vidId) return

        console.log(vidId)

        info.url = `https://www.youtube.com/embed/${vidId}`

        notesService.createNote('note-vid', info)
            .then(this.props.onClose).then(this.props.onUpdate)
    }

    render() {
        const { isOpen, type, url, isYoutube } = this.state

        return <section className='add-note'>
            {!isOpen &&
                <React.Fragment>
                    <p onClick={() => this.onToggleOpen('note-txt')}>Take a note...</p>
                    <button title="To-do list" className="note-btn img-checkbox-checked clean-btn" onClick={this.onSelectTodo}></button>
                    <div title="Add image" className='invisible-btn'>
                        <button className="note-btn img-img-btn clean-btn"></button>
                        <input type="file" onChange={this.onSelectImg} accept="image/png, image/gif, image/jpeg" />
                    </div>
                    <button title="Youtube" className="note-btn img-youtube clean-btn" onClick={() => this.onToggleOpen('note-vid')}></button>
                </React.Fragment>
            }

            {isOpen && <React.Fragment>
                <DynamicNote note={{
                    type: type, info: { title: '', txt: '', url, todos: [] },
                    style: { backgroundColor: 'none' }
                }}
                    onClose={() => this.onToggleOpen(null)} isCreate={true}
                    isYoutube={isYoutube}
                    onUpdate={isYoutube ? this.onYoutubeSubmit : this.props.onUpdate} />
            </React.Fragment>}
        </section>
    }
}