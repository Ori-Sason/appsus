import { mailService } from '../services/mail.service.js'
import { SearchFilter } from '../cmps/search-filter.jsx'
import { MailSections } from '../cmps/mail-sections.jsx'
import { MailList } from '../cmps/mail-list.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: null,
  }
  componentDidMount() {
    this.loadMails()
    console.log(this.state.mails)
  }
  loadMails = () => {
    mailService
      .query(this.state.filterBy)
      .then((mails) => this.setState({ mails }))
  }
  changeSection = (section) => {
    this.setState((prevState)=>({filterBy:{...prevState.filterBy,section}}))
  }
  setFilter =(filterBy)=>{
    this.setState({filterBy},this.loadMails(filterBy))
  }
  render() {
    console.log(this.state.mails)
    const {mails} =this.state
    
    return (
      <section className="mail-app main-layout">
        <SearchFilter />
        <MailSections changeSection={this.changeSection} />
        <Switch>
        {/* <Route path={`/mail/:${section}?`} component ={MailList} mails={mails} setFilter={this.setFilter} /> */}
        <MailList mails={mails} />
        </Switch>
      </section>
    )
  }
}
