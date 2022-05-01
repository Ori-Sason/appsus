import { SearchFilter } from '../cmps/search-filter.jsx'
import { MailSections } from '../cmps/mail-sections.jsx'
import { Compose } from '../cmps/compose-mail.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailEdit } from '../cmps/mail-edit.jsx'
import { MaiLView } from '../cmps/mail-view.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch} = ReactRouterDOM

export class MailApp extends React.Component {
  state = {
  }
  componentDidMount() {
    if (this.props.location.pathname === '/mail') this.props.history.push(`/mail/inbox`)
  }
  render() {
    return (
      <section className="mail-app main-layout">
        <SearchFilter />
        <Compose compose={this.addMail} />
        <Router>
          <Switch>
            <Route path={`/mail/edit/:mailId?`} component={MailEdit} />
            <Route path={`/mail/view/:mailId?`} component={MaiLView} />
            <Route path={`/mail/`} component={MailList} />
          </Switch>
        <MailSections />

        </Router>

      </section>
    )
  }
}
