export class TodoItem extends React.Component {
    state = {
        id: '',
        txt: '',
        isChecked: false
    }

    componentDidMount() {
        this.setState({ ...this.props.todo })
    }

    onInputChange = (ev) => {
        const { isNewTodo } = this.props
        const { value } = ev.target
        this.setState((prevState) => ({ ...prevState, txt: value }), () => this.props.onUpdate(this.state, isNewTodo))
    }

    onToggleChecked = (ev) => {
        if (this.props.isNewTodo) return
        const { checked } = ev.target
        this.setState((prevState) => ({ ...prevState, isChecked: checked }), () => this.props.onUpdate(this.state))
    }

    render() {
        const { isNewTodo } = this.props
        const { txt, isChecked } = this.state
        if (!txt && !isNewTodo) return <React.Fragment></React.Fragment>

        const textClass = isChecked ? 'todo-strikeline' : ''

        return <section className="note-todo-item">
            <input type="checkbox" checked={isChecked} onChange={this.onToggleChecked} ></input>
            <input type="text" placeholder="List item" className={`no-focus-visible ${textClass}`} value={txt} onChange={this.onInputChange} autoFocus={true}/>
        </section>
    }
}