
import {MailPreview}  from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'
import {eventBusService} from '../../../services/event.bus.service.js'



export class MailList extends React.Component {

state = {
  isSort:false,
  mails: [],
  filterBy: {
    txt: '',
    type: '',
    ctg:'inbox'
  },
}
removeEvent1;
removeEvent2;
componentDidMount() {
  this.setFilter(this.state.filterBy)
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
      ctg:'inbox',
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

changeCtg = (curCtg) => {
  this.setState(
    (prevState) => ({ filterBy: { ...prevState.filterBy, ctg: curCtg } }),
    () => {
      this.setFilter(this.state.filterBy)
    }
  )
}
setFilter = (filterBy) => {
  this.setState({ filterBy }, () => {
    this.loadMails(filterBy)
  })
  const urlSrcPrm = new URLSearchParams(filterBy)
  const searchStr = urlSrcPrm.toString()
  // this.props.history.push(`/mail/edit/:?${searchStr}`)   renders everything adn cancels the nam menu  style
}
toggleSortBtn = ()=>{
const {isSort} = this.state
this.setState({isSort:!isSort})
}
onSortBy=(sortBy)=>{
  let int=1
  if(this.state.filterBy.sortBy){
    int= this.state.filterBy.sortBy[0]===sortBy? -1:1
  }
  this.setState(
    (prevState) => ({ filterBy: { ...prevState.filterBy, sortBy: [sortBy,int] } }),
    () => {
      this.setFilter(this.state.filterBy)
    }
  )
}
componentWillUnmount() {
  this.removeEvent1()
  this.removeEvent2()
}

render(){
  const {mails,isSort} = this.state
  if(!mails) return<React.Fragment></React.Fragment>
  
  return <div className="mail-list">
    <div onClick={this.toggleSortBtn} className="fa fa-angle-down">
      <div className="sorting-opts">
      {isSort&&<div onClick={()=>this.onSortBy('title')} className="sort-by-title">Title</div>}
      {isSort&&<div onClick={()=>this.onSortBy('date')} className="sort-by-date">Date</div>}
      </div>
    </div>
    {mails.map(mail=> <MailPreview key={mail.id} mail={mail} loadMails={this.loadMails}/>)}
  
  
  </div>
}
}
