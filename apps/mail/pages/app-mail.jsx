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
  state = {
    mails: [],
    filterBy: {
      txt: '',
      type: '',
    },
  }
  componentDidMount() {
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    let paramObj = {}
    for (var value of urlSrcPrm.keys()) {
      paramObj[value] = urlSrcPrm.get(value)
    }
    if (Object.keys(paramObj).length === 0)
      paramObj = {
        txt: '',
        type: '',
      }
    this.setState(
      (prevState) => ({ ...prevState, filterBy: paramObj }),
      () => {
        this.loadMails()
      }
    )
  }
  loadMails = () => {
    mailService
      .query(this.state.filterBy)
      .then((mails) => this.setState({ mails }))
  }
  addMail(mail) {}
  changeCtg = (curCtg) => {
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, ctg: curCtg } }),
      () => {
        this.setFilter(this.state.filterBy)
      }
    )
  }
  setFilter = (filterBy) => {
    console.log('wow')
    this.setState({ filterBy }, () => {
      this.loadMails(filterBy)
    })
    const urlSrcPrm = new URLSearchParams(filterBy)
    const searchStr = urlSrcPrm.toString()
    this.props.history.push(`/mail?${searchStr}`)
  }
  render() {
    const { mails } = this.state

    return (
      <section className="mail-app main-layout">
        <SearchFilter setFilter={this.setFilter} />
        <Compose compose={this.addMail} />
        <MailSections changeCtg={this.changeCtg} />
        <Router>
        <Switch>
          <Route path={`/mail/edit/:mailId?`}  component={MaleEdit} />
          <Route path={`/mail/view/:mailId?`}  component={MaiLView} />
          <Route path={`/mail`} component={MailList} />
        </Switch>
      </Router>
      </section>
    )
  }
}
