import { mailService } from '../services/mail.service.js'
const { withRouter } = ReactRouterDOM
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
      (prevState) => ({ mail: { ...prevState.mail, isStar: !isStar } }),()=>{
          this.onUpdateMale()
      }
    )
  }
  toggleRead = () => {
    const { isRead } = this.state.mail
    this.setState(
      (prevState) => ({ mail: { ...prevState.mail, isRead: !isRead } }),()=>{
          this.onUpdateMale()
      }
    )
  }
  deleteMail = (mailId) => {
    mailService.deleteMailById(mailId).then(() => this.setState({ mail: null }))
  }
  onUpdateMale = () => {
      const {mail } = this.state
    mailService.updateMail(mail)

  }
  render() {
    const { mail, isHover } = this.state
    console.log()
    if (!mail) return <React.Fragment></React.Fragment>
    return (
      <div
        onMouseEnter={this.mouseIn}
        onMouseLeave={this.mouseOut}
        className="mail-preview"
      >
        <a
          onClick={this.toggleStar}
          className={`star ${mail.isStar ? 'yellow' : ''}`}
        >
          {mail.isStar ? this.fullStar : this.emptyStar}
        </a>
        <h1 className="mail-subject">{mail.subject}</h1>
        <p className="mail-txt-content">{mail.body}</p>
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
          </div>
        )}
      </div>
    )
  }
}

export const MailPreview = withRouter(_MailPreview)
