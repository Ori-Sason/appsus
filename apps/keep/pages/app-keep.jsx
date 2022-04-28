import { notesService } from '../services/notes.service.js'
import { NotesFilter } from '../cmps/notes-filter.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/notes-list.jsx'

import { EditNote } from './edit-note.jsx'

const { Switch, Route } = ReactRouterDOM

export function KeepApp() {
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
