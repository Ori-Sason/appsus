
import {MailPreview}  from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'
import {eventBusService} from '../../../services/event.bus.service.js'



export class MailList extends React.Component {

state = {
  mails: [],
  filterBy: {
    txt: '',
    type: '',
  },
}
removeEvent1;
removeEvent2;
componentDidMount() {
  this.removeEvent1=eventBusService.on('changeCtg',(ctg)=>{
    this.changeCtg(ctg)
  })
  this.removeEvent2 =eventBusService.on('changeFilter',(filterBy)=>{
    this.setFilter(filterBy)
  })
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
addMail(mail) {

}
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
  // this.props.history.push(`/mail/:?${searchStr}`)
  console.log(this.props)
}
componentWillUnmount() {
  this.removeEvent1()
  this.removeEvent2()
}

render(){

  const {mails} = this.state
  if(!mails) return<React.Fragment></React.Fragment>
  
  return <div className="mail-list">
    {mails.map(mail=> <MailPreview key={mail.id} mail={mail} />)}
  
  
  </div>
}
}
