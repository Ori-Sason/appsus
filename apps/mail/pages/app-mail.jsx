import { mailService } from '../services/mail.service.js'
import { SearchFilter } from '../cmps/search-filter.jsx'
import { MailSections } from '../cmps/mail-sections.jsx'
import { Compose } from '../cmps/compose-mail.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MaleEdit } from '../cmps/mail-edit.jsx'
import { MaiLView } from '../cmps/mail-view.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
 state={

 }
  componentDidMount() {
    // this.props.history.push(`/mail/inbox`)
  }
  render() {
    const { mails } = this.state
    return (
      <section className="mail-app main-layout">
        <SearchFilter  />
        <Compose compose={this.addMail} />
        <MailSections  />
        <Router>
        <Switch>
          <Route path={`/mail/edit/:mailId?`}  component={MaleEdit} />
          <Route path={`/mail/view/:mailId?`}  component={MaiLView} />
          <Route path={`/mail/`} component={MailList} />
        </Switch>
      </Router>
      </section>
    )
  }
}
