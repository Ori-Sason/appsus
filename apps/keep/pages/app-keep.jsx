import { notesService } from '../services/notes.service.js'
import { NotesFilter } from '../cmps/notes-filter.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/notes-list.jsx'

export class KeepApp extends React.Component {
    state = {

    }

    render() {
        return <section className="app-keep main-layout">
            <NotesFilter />
            <AddNote />
            <NoteList />
        </section>
    }
}
