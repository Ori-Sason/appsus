
import {MailPreveiw}  from '../cmps/mail-preview.jsx'



export function MailList({ mails }) {
    console.log(mails)
  return <div className="mail-list">
    {mails.map(mail=> <MailPreveiw key={mail.id} mail={mail} />)}
  
  
  </div>
}
