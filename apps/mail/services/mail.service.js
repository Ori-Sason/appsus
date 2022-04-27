import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
let gFilteredMails

export const mailService = {
  query,
  getMailById,
  deleteMailById,
  updateMail,
  getFilterdMails,
}




function query(filterBy) {
  let mails = _loadFromStorage()
  if (!mails || mails.length === 0) {
    mails = _createMails()
    _saveToStorage(mails)
  }
  if (filterBy) {
    switch (filterBy.ctg) {
      case 'all':
        mails = mails.filter(
          (mail) =>
            mail.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
            mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase())
        )
        gFilteredMails = mails
        return Promise.resolve(mails)
      case 'inbox':
        break
      case 'starred':
        mails = mails.filter((mail) => mail.isStar === true)
        break
      case 'draft':
        mails = mails.filter((mail) => mail.isDrafted === true)
        break
      case 'deleted':
        mails = mails.filter((mail) => mail.isDeleted === true)
        break
      case 'sent':
        mails = mails.filter((mail) => mail.from === loggedinUser.email)
        break
    }

    if (filterBy.type === 'read') {
      mails = mails.filter((mail) => mail.isRead === true)
    } else if (filterBy.type === 'unread') {
      mails = mails.filter((mail) => mail.isRead === false)
    }
    mails = mails.filter(
      (mail) =>
        mail.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
        mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase())
    )
  }
  gFilteredMails = mails
  return Promise.resolve(mails)
}
function getFilterdMails() {
  return gFilteredMails
}
function updateMail(mailtoUpdate) {
  let mails = _loadFromStorage()
  mails = mails.map((mail) =>
    mail.id === mailtoUpdate.id ? mailtoUpdate : mail
  )
  _saveToStorage(mails)
}

function getMailById(mailId) {
  const mails = _loadFromStorage()
  const mail = mails.find((mail) => mail.id === mailId)
  if (!mail) return null
  return mail
}
function deleteMailById(mailId) {
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
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident deserunt ab quos placeat ut doloribus doloremque incidunt maxime atque animi, magni expedita quibusdam quas commodi tenetur, rerum autem accusamus quidem.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes sssssssyyysssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sasdaswavxcbgjnometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch asdewfergsup sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch qwewqgrefddsup sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: 'user@appsus.com',
    },
  ]
}
function _loadFromStorage() {
  return storageService.loadFromStorage(MAIL_STORAGE_KEY)
}

function _saveToStorage(mails) {
  storageService.saveToStorage(MAIL_STORAGE_KEY, mails)
}
