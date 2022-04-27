import { mailService } from '../services/mail.service.js'
import {utilService} from '../../../services/util.service.js'

export function MaiLView(props) {
  const { mailId } = props.match.params
  console.log(mailId)
  const emptyStar = String.fromCharCode(9734)
  const fullStar = String.fromCharCode(9733)
  const mail = mailService.getMailById(mailId)
  const sentAt = utilService.formatAMPM(mail.sentAt)
  return (
    <div className="mail-view">
      <div className="mail-subject">{mail.subject}</div>
      <div className="mail-info">
        <div className="mail-people">
        <p className="mail-from">from: {mail.from === `user@appsus.com`?'me':mail.from}</p>
        <p className="mail-to">to: {mail.to === `user@appsus.com`?'me':mail.to}</p>
        </div>
        <div className="time-star">
        <span className="mail-time">{sentAt}</span>
        <a className={`star ${mail.isStar ? 'yellow' : ''}`}>{mail.isStar?fullStar:emptyStar}</a>
        </div>
      </div>
        <p className="mail-txt">{mail.body}</p>
    </div>
  )
}
/** id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes sssssssdddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com', */
     