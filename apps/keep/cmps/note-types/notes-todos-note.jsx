import { notesService } from '../../services/notes.service.js'
import { NoteBtns } from '../note-btns.jsx'
import { TodoItem } from './notes-todo-item.jsx'

export class TodoNote extends React.Component {
    state = {
        note: null,
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    onInputChange = (ev) => {
        const { name, value } = ev.target
        this.setState((prevState) => ({ note: notesService.copyAndUpdateNote(prevState.note, name, value) }))
        console.log('first')
    }

    onTodoChange = (newTodo, isNewTodo) => {
        const { todos } = this.state.note.info
        const newNote = JSON.parse(JSON.stringify(this.state.note))

        if (isNewTodo) {
            newNote.info.todos.push(newTodo)
        } else {
            const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
            if (newTodo.txt.trim()) newNote.info.todos[todoIdx] = newTodo
            else newNote.info.todos.splice(todoIdx, 1)
        }

        this.setState({ note: newNote }, () => {
            if (newTodo) null
        })
        this.onFormSubmit()
    }

    onFormSubmit = (ev) => {
        if (ev) ev.preventDefault()
        console.log('michael submit todo', this.props.onUpdate)
        if (this.props.isCreate) {
            notesService.createNote('note-todos', { ...this.state.note.info })
            .then(this.props.onClose).then(this.props.onUpdate)
        } else {
            notesService.updateNote(({ ...this.props.note, info: { ...this.state.note.info } }))
                .then(this.props.onClose).then(this.props.onUpdate)
        }
    }

    render() {
        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>

        const { isPreview } = this.props
        const { title, todos } = note.info
        const newTodoId = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1

        return <section className="todo-note note-types">
            <form onSubmit={this.onFormSubmit}>
                <div className="backlog-container">
                    <div className={isPreview ? 'backlog' : ''}></div>
                    <input className="no-focus-visible" type="text" name="title" placeholder="Title" value={title} onChange={this.onInputChange} autoComplete="off"/>
                </div>
                {note.info.todos.map(todo => <TodoItem key={todo.id} todo={todo} isNewTodo={false} onTodoChange={this.onTodoChange} isPreview={isPreview} />)}
                {!isPreview && <TodoItem key={newTodoId} todo={{ id: newTodoId, txt: '', isChecked: false }} isNewTodo={true} onTodoChange={this.onTodoChange} isPreview={isPreview} />}
                <NoteBtns {...this.props} noteId={note.id} />
            </form>
        </section>
    }
}