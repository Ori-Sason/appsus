import { notesService } from '../services/notes.service.js'
import { NotesFilter } from '../cmps/notes-filter.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/notes-list.jsx'

import { EditNote } from './edit-note.jsx'

const { Switch, Route } = ReactRouterDOM

export class KeepApp extends React.Component {
    state = {
        note: null,
        isEditMode: true
    }

    render() {
        const { note, isEditMode } = this.state

        return <section className="app-keep main-layout">
            <NotesFilter />
            <AddNote />
            <NoteList />

            <section>
                <Switch>
                    <Route path='/keep/list/:noteId' component={EditNote} />
                </Switch>
            </section>
        </section>
    }
}
