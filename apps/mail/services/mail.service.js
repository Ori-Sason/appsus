import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
export const mailService = {
  query,
  getMailById,
  deleteMailById,
  updateMail
}






function query(filterBy) {
    console.log('hey');
  let mails = _loadFromStorage()
  if (!mails || mails.length === 0) {
    mails = _createMails()
    _saveToStorage(mails)
  }
  console.log(filterBy?'yes':'no',filterBy)
  if (filterBy) {
    if(filterBy.type==='read')  {
      mails = mails.filter((mail) =>mail.isRead===true)
    }else if (filterBy.type==='unread'){
      mails = mails.filter((mail) =>mail.isRead===false)
    }
    mails = mails.filter((mail) => mail.body.toLowerCase().includes(filterBy.txt.toLowerCase())||mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase())  
    )
  }
  return Promise.resolve(mails)
}
function updateMail(mailtoUpdate){
  console.log('hey')
  console.log(mailtoUpdate)
  let mails = _loadFromStorage()
   mails = mails.map((mail) => mail.id === mailtoUpdate.id?mailtoUpdate:mail)
   _saveToStorage(mails)


}

function getMailById(mailId){
  const mails = _loadFromStorage()
  const mail = mails.find((mail) => mail.id === mailId)
  if (!mail) return null
    return mail
}
function deleteMailById(mailId){
  let mails = _loadFromStorage()
  mails = mails.filter((mail) => mail.id !== mailId)
  _saveToStorage(mails)
  return Promise.resolve(mails)
}
function _createMails() {
  return [
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up somezxctimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes sssssssdddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes sssssssyyysssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sasdaswavxcbgjnometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch asdewfergsup sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch qwewqgrefddsup sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar:false,
      isRead: false,
      isDraft:false,
      isDeleted:false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from:'user@appsus.com'
    },
  ]
}
function _loadFromStorage() {
  return storageService.loadFromStorage(MAIL_STORAGE_KEY)
}

function _saveToStorage(mails) {
  storageService.saveToStorage(MAIL_STORAGE_KEY, mails)
}
