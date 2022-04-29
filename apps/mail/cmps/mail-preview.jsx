import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { eventBusService } from '../../../services/event.bus.service.js'
const { withRouter, Link } = ReactRouterDOM
class _MailPreview extends React.Component {
  state = {
    isHover: false,
  }
  emptyStar = String.fromCharCode(9734)
  fullStar = String.fromCharCode(9733)
  componentDidMount() {
    const { mail } = this.props
    this.setState({ mail })
  }
  mouseIn = () => {
    this.setState({ isHover: true })
  }
  mouseOut = () => {
    this.setState({ isHover: false })
  }
  toggleStar = (ev) => {
    ev.stopPropagation()
    const { mail } = this.state
    const { isStar } = this.state.mail
    this.setState(
      (prevState) => ({ mail: { ...prevState.mail, isStar: !isStar } }),
      () => {
        this.onUpdateMale()
      }
    )
  }
  toggleRead = (ev,isOnList) => {
    ev.stopPropagation()
    const { mail } = this.state
    const { isRead } = this.state.mail
    this.setState(
      (prevState) => ({ mail: { ...prevState.mail, isRead: !isRead } }),
      () => {
        this.onUpdateMale()
        eventBusService.emit('unread','unreadclickd')
       if (isOnList) this.props.history.push(`/mail/view/${mail.id}`)
      }
    )
  }
  deleteMail = (ev,mailId) => {
    ev.stopPropagation()
    this.setState({ mail: null },()=>{
      mailService.deleteMailById(mailId).then(()=>this.props.loadMails()).then(eventBusService.emit('unread','unreadclickd'))

    })
    // mailService.deleteMailById(mailId).then(() => this.setState({ mail: null })).then(()=>this.props.loadMails())
    // mailService.deleteMailById(mailId).then(()=>this.props.loadMails()).then(() => this.setState({ mail: null })).then(eventBusService.emit('unread','unreadclickd'))
  }
  onUpdateMale = () => {
    const { mail } = this.state
    mailService.updateMail(mail)
  }
  render() {
    const { mail, isHover } = this.state
    if (!mail) return <React.Fragment></React.Fragment>
    const sentAt = utilService.formatAMPM(mail.sentAt)
    return (
      
      <div
        onClick={(ev)=>{
          this.toggleRead(ev,true)
          
        }}

        
        onMouseEnter={this.mouseIn}
        onMouseLeave={this.mouseOut}
        className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
      >
        <a
          onClick={(ev)=>{this.toggleStar(ev)}}
          className={`star ${mail.isStar ? 'yellow' : ''}`}
        >
          {mail.isStar ? this.fullStar : this.emptyStar}
        </a>
        <h1 className='mail-from'>{mail.from.userName}</h1>
        <h5 className="mail-subject">{mail.subject}</h5>
        <p className="mail-txt-content">{mail.body}</p>
        {!isHover && <div className="preview-time">{sentAt}</div>}
        {isHover && (
          <div className="mail-prev-btns">
            <button className="fa fa-archive"></button>
            <button
              onClick={(ev) => {
                this.deleteMail(ev,mail.id)
              }}
              className="fa fa-trash"
            ></button>
            <button
              onClick={(ev)=>this.toggleRead(ev,false)}
              className={`fa fa-envelope-${mail.isRead ? 'open' : 'close'}`}
            ></button>
          </div>
        )}
      </div>
    )
  }
}

export const MailPreview = withRouter(_MailPreview)
