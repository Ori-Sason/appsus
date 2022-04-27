
import {MailPreview}  from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'



export function MailList() {
const mails = mailService.getFilterdMails()
if(!mails) return<React.Fragment></React.Fragment>

return <div className="mail-list">
    {mails.map(mail=> <MailPreview key={mail.id} mail={mail} />)}
  
  
  </div>
}
