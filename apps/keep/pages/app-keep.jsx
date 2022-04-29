import { notesService } from '../services/notes.service.js'
import { NotesFilter } from '../cmps/notes-filter.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/notes-list.jsx'

import { EditNote } from './edit-note.jsx'

const { Switch, Route } = ReactRouterDOM

export class KeepApp extends React.Component {
    state = {
        notes: null,
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        return notesService.query().then(notes => this.setState({ notes }))
    }

    resetNote = () => {
        this.setState({ notes: null })
    }

    get notesToDisplay() {
        const { pathname } = this.props.location
        const ctg = pathname.split('/')[2]
        return notesService.getNotesByCtg(ctg) /** FIX - DO IT ASYNC*/
    }

    render() {
        const { notes } = this.state //** IF I DONT USE notesToDisplay IT SHOULD BE <NoteList notes={notes} ... />  */

        return <section className="app-keep main-layout">
            <NotesFilter />
            <AddNote onUpdate={this.loadNotes} />
            <NoteList notes={notes} onUpdate={this.loadNotes} />

            <section>
                <Switch>
                    <Route path='/keep/list/:noteId?' component={({ match, history }) => <EditNote match={match} history={history} onUpdate={this.loadNotes} onReset={this.resetNote} />} />
                </Switch>
            </section>
        </section>
    }
}
