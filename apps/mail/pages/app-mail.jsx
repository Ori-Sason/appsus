import { mailService } from '../services/mail.service.js'
import { SearchFilter } from '../cmps/search-filter.jsx'
import { MailSections } from '../cmps/mail-sections.jsx'
import { Compose } from '../cmps/compose-mail.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MaleEdit } from '../cmps/mail-edit.jsx'
import { MaiLView } from '../cmps/mail-view.jsx'
import { MeterBar } from '../cmps/meter-bar.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
 state={

 }
  componentDidMount() {
    console.log(this.props.location.pathname)
   if(this.props.location.pathname==='/mail') this.props.history.push(`/mail/inbox`)
    
  }
  render() {
    const { mails } = this.state
    return (
      <section className="mail-app main-layout">
        <SearchFilter  />
        <MeterBar/>
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
/* Meter */
/*
value - mandatory
max - maximum value
min - minmum value
<meter value="" max="100%" min="0%">range</meter>
*/