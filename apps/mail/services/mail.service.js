import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
export const mailService = {
  query,
}
utilService.makeId()
function query(filterBy) {
    console.log('hey');
  let mails = _loadFromStorage()
  if (!mails || mails.length === 0) {
    mails = _createMails()
    _saveToStorage(mails)
  }
  
  // if (filterBy) {
  //   mails = mails.filter(
  //     (book) =>
  //       book.title.toLowerCase().includes(filterBy.name.toLowerCase()) &&
  //       (filterBy.price === 0 || book.listPrice.amount < filterBy.price)
  //   )
  // }
  return Promise.resolve(mails)
}

function _loadFromStorage() {
  return storageService.loadFromStorage(MAIL_STORAGE_KEY)
}

function _saveToStorage(mails) {
  storageService.saveToStorage(MAIL_STORAGE_KEY, mails)
}

function _createMails() {
  return [
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
