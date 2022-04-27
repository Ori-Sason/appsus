const { Switch, Route } = ReactRouterDOM
import { NotesFilterItem } from './notes-filter-item.jsx'

export function NotesFilter() {
    return <section className="notes-filter">
        <nav className="filter-list">
            <NotesFilterItem img="" name="Notes" />
            <NotesFilterItem img="" name="Reminders" />
            <NotesFilterItem img="" name="Edit-label" />
            <NotesFilterItem img="" name="Archive" />
            <NotesFilterItem img="" name="Bin" />
        </nav>

        <section>
            <Switch>
                {/* <Route path="/keep/" component={'a'} /> */}
            </Switch>
        </section>
    </section>
}