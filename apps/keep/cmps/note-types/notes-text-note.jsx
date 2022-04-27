export class TxtNote extends React.Component {
    state = {
        title: '',
        txt: '',
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

        return <section className="text-note">
            <form onSubmit={this.onFormSubmit}>
                <input type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} />
                <input type="text" name="txt" placeholder="Take a note..." value={txt} onChange={this.onInputChange} />
                <div className="btn-container">
                    <button type="button" className="img-reminder clean-btn"></button>
                    <button type="button" className="img-color clean-btn"></button>
                    <button type="button" className="img-img-btn clean-btn"></button>
                    <button type="button" className="clean-btn" onClick={this.props.onClose}>Close</button>
                    <button type="submit" className="clean-btn" >Create</button>
                </div>
            </form>
        </section>
    }
}