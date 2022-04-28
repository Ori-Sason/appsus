const { Switch, Route } = ReactRouterDOM
import { NotesFilterItem } from './notes-filter-item.jsx'

export function NotesFilter() {
    return <section className="notes-filter">
        <nav className="filter-list">
            <NotesFilterItem name="Notes" />
            <NotesFilterItem name="Reminders" />
            <NotesFilterItem name="Edit-label" />
            <NotesFilterItem name="Archive" />
            <NotesFilterItem name="Bin" />
        </nav>
    </section>
}