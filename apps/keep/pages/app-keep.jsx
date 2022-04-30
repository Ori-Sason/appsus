import { notesService } from '../services/notes.service.js'
import { NotesFilter } from '../cmps/notes-filter.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/notes-list.jsx'

import { EditNote } from './edit-note.jsx'
import { CustomColorPicker } from "../../../cmps/custom-color-picker.jsx"
import { eventBusService } from '../../../services/event.bus.service.js'


const { Switch, Route } = ReactRouterDOM

export class KeepApp extends React.Component {
    state = {
        notes: null,
        colorPicker: {
            isColorPickerOpen: false,
            x: null,
            y: null,
            noteId: null
        }
    }
    stopEvent1
    stopEvent2
    componentDidMount() {
      this.stopEvent1= eventBusService.on('notes-toggle-color', ({ ev, noteId }) => {
            this.setState({
                colorPicker: {
                    isColorPickerOpen: !this.state.colorPicker.isColorPickerOpen,
                    x: ev.clientX + window.pageXOffset,
                    y: ev.clientY + window.pageYOffset,
                    noteId
                }
            })
        })

        this.stopEvent2=  eventBusService.on('notes-picked-color', (color) => {
            notesService.changeBgColor(this.state.colorPicker.noteId, color)
                .then(this.setState({ colorPicker: { isColorPickerOpen: false } }))
                .then(() => { this.resetNotes(); this.loadNotes() })
        })

        this.loadNotes()
    }

    loadNotes = () => {
        return notesService.query().then(notes => this.setState({ notes }))
    }

    resetNotes = () => {
        this.setState({ notes: null })
    }

    getMainBody = () => {

        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const mailId = urlSrcPrm.get('mailId')

        if (mailId) {
            this.createNoteFromEmail(mailId)
        }

        let { notes } = this.state
        if (!notes) return <p>Loading...</p>

        const { pathname } = this.props.location
        const ctg = pathname.split('/')[2]

        if (ctg) return <NoteList notes={this.notesToDisplay(notes, ctg)} onUpdate={this.loadNotes} />
        else notes = this.notesToDisplay(notes, 'main')

        const body = []
        const pinnedNotes = notes.filter(note => note.isPinned)
        const unPinnedNotes = notes.filter(note => !note.isPinned)

        if (pinnedNotes.length > 0) {
            body.push(<h3>Pinned</h3>)
            body.push(<NoteList notes={pinnedNotes} onUpdate={this.loadNotes} />)
            if (unPinnedNotes.length > 0) body.push(<h3>Others</h3>)
        }

        body.push(<NoteList notes={unPinnedNotes} onUpdate={this.loadNotes} />)

        return body.map((el, idx) => <React.Fragment key={idx}>{el}</React.Fragment>)
    }

    createNoteFromEmail = (mailId) => {
        notesService.addNoteFromMail(mailId).then(noteId => {
            this.props.history.push(`/keep`)
            this.loadNotes()
        })
    }

    notesToDisplay = (notes, ctg) => {

        if (ctg === 'bin') return notes.filter(note => note.isDeleted)
        if (ctg === 'archive') return notes.filter(note => note.isArchived && !note.isDeleted)
        if (ctg === 'reminders') return notes.filter(note => note.reminder && !note.isDeleted && !note.isArchived)
        return notes.filter(note => !note.isDeleted && !note.isArchived)
    }
    componentWillUnmount() {
        this.stopEvent1()
        this.stopEvent2()
    }

    render() {
        const { colorPicker } = this.state

        return <section className="app-keep main-layout">
            < NotesFilter />
            <AddNote onUpdate={this.loadNotes} />
            <main className='note-main-body'>
                {this.getMainBody()}
                {colorPicker.isColorPickerOpen &&
                    <React.Fragment>
                        <div className='custom-color-picker-container' onClick={() => this.setState({ colorPicker: { isColorPickerOpen: false } })}></div>
                        <CustomColorPicker posX={colorPicker.x} posY={colorPicker.y} />
                    </React.Fragment>
                }
            </main>

            <section>
                <Switch>
                    <Route path='/keep/list/:noteId?' component={({ match, history }) => <EditNote match={match} history={history} onUpdate={this.loadNotes} onReset={this.resetNotes} />} />
                </Switch>
            </section>
        </section >
    }
}
