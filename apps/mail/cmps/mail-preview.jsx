import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
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
  toggleStar = () => {
    const { mail } = this.state
    const { isStar } = this.state.mail
    this.setState(
      (prevState) => ({ mail: { ...prevState.mail, isStar: !isStar } }),
      () => {
        this.onUpdateMale()
      }
    )
  }
  toggleRead = () => {
    const { isRead } = this.state.mail
    this.setState(
      (prevState) => ({ mail: { ...prevState.mail, isRead: !isRead } }),
      () => {
        this.onUpdateMale()
      }
    )
  }
  deleteMail = (mailId) => {
    mailService.deleteMailById(mailId).then(() => this.setState({ mail: null }))
  }
  onUpdateMale = () => {
    const { mail } = this.state
    mailService.updateMail(mail)
  }
  render() {
    const { mail, isHover } = this.state
    console.log()
    if (!mail) return <React.Fragment></React.Fragment>
    const sentAt = utilService.formatAMPM(mail.sentAt)
    return (
      <div
        onMouseEnter={this.mouseIn}
        onMouseLeave={this.mouseOut}
        className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
      >
        <a
          onClick={this.toggleStar}
          className={`star ${mail.isStar ? 'yellow' : ''}`}
        >
          {mail.isStar ? this.fullStar : this.emptyStar}
        </a>
        <h1 className="mail-subject">{mail.subject}</h1>
        <p className="mail-txt-content">{mail.body}</p>
        {!isHover && <div className="preview-time">{sentAt}</div>}
        {isHover && (
          <div className="mail-prev-btns">
            <button className="fa fa-archive"></button>
            <button
              onClick={() => {
                this.deleteMail(mail.id)
              }}
              className="fa fa-trash"
            ></button>
            <button
              onClick={this.toggleRead}
              className={`fa fa-envelope-${mail.isRead ? 'open' : 'close'}`}
            ></button>
            <Link to={`mail/view/${mail.id}`}>
              <button className="fa fa-solid fa-magnifying-glass"></button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export const MailPreview = withRouter(_MailPreview)
