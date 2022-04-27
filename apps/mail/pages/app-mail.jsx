import { mailService } from '../services/mail.service.js'
import { SearchFilter } from '../cmps/search-filter.jsx'
import { MailSections } from '../cmps/mail-sections.jsx'
import {Compose} from '../cmps/compose-mail.jsx'
import { MailList } from '../cmps/mail-list.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: {
      txt:'',
      type:''
    },
  }
  componentDidMount() {
    console.log(this.props)
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    let paramObj = {}
    for (var value of urlSrcPrm.keys()) {
        paramObj[value] = urlSrcPrm.get(value);
    }
    if (Object.keys(paramObj).length===0) paramObj = {
      txt:'',
      type:''
    }
    this.setState(prevState => ({ ...prevState, filterBy: paramObj }), () => {
      console.log(paramObj)
      this.loadMails()
    })
    
  }
  loadMails = () => {
    mailService
      .query(this.state.filterBy)
      .then((mails) => this.setState({ mails }))
  }
  addMail(mail){
    console.log(mail)
  }
  changeCtg = (curCtg) => {
    this.setState((prevState)=>({filterBy:{...prevState.filterBy,ctg:curCtg}}),()=>{
      this.setFilter(this.state.filterBy)
    })
  }
  setFilter =(filterBy)=>{
    this.setState({filterBy},()=>{
      this.loadMails(filterBy)})
      const urlSrcPrm = new URLSearchParams(filterBy)
      const searchStr = urlSrcPrm.toString()
      this.props.history.push(`/mail?${searchStr}`)
    
  }
  render() {
    console.log(this.state.mails)
    const {mails} =this.state
    console.log(mails)
    
    return (
      <section className="mail-app main-layout">
        <SearchFilter setFilter={this.setFilter} />
        <Compose compose={this.addMail}/>
        <MailSections changeCtg={this.changeCtg} />
        <Switch>
        {/* <Route path={`/mail/:${section}?`} component ={MailList} mails={mails} setFilter={this.setFilter} /> */}
        <MailList mails={mails} />
        </Switch>
      </section>
    )
  }
}
