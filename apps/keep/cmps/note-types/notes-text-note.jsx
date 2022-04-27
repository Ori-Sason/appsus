export class TxtNote extends React.Component {
    state = {
        title: '',
        txt: '',
    }

    componentDidMount() {
        this.setState({ ...this.props.note.info })
    }

    onInputChange = (ev) => {
        const { name, value } = ev.target
        this.setState((prevState) => ({ ...prevState, [name]: value }))
    }

    onFormSubmit = (ev) => {
        ev.preventDefault()
        this.props.onCreateNote(({ type: 'note-txt', info: { ...this.state } }))
    }

    render() {
        const { title, txt } = this.state
        const { isPreview } = this.props

        return <section className="text-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <div className="input-text-container">
                    <div className={isPreview ? 'backlog' : ''}></div>
                    <input className={isPreview && !title ? 'hide' : ''} type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} />
                    <input className={isPreview && !txt ? 'hide' : ''} type="text" name="txt" placeholder="Take a note..." value={txt} onChange={this.onInputChange} />
                </div>
                <div className="btn-container">
                    <button type="button" className="note-btn img-reminder clean-btn"></button>
                    <button type="button" className="note-btn img-color clean-btn"></button>
                    <button type="button" className="note-btn img-img-btn clean-btn"></button>
                    <button type="button" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`} onClick={this.props.onClose}>Close</button>
                    <button type="submit" className={`note-btn btn-text clean-btn ${isPreview ? 'hide' : ''}`}>Create</button>
                </div>
            </form>
        </section>
    }
}