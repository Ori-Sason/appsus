import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

export const mailService = {
  query,
  getMailById,
  deleteMailById,
  updateMail,
  addMail,
  getUnreadEmails
}




function query(filterBy) {
  let mails = _loadFromStorage()
  if (!mails || mails.length === 0) {
    mails = _createMails()
    _saveToStorage(mails)
  }

  if (filterBy) {
    if (filterBy.sortBy) {
      switch (filterBy.sortBy[0]) {
        case 'title':
          mails.sort((a, b) => a.subject.toLowerCase().localeCompare(b.subject.toLowerCase()) * filterBy.sortBy[1])
          break;

        case 'date':
          mails.sort((a, b) => (a.sentAt - b.sentAt) * filterBy.sortBy[1])
          break;
      }
    }
    switch (filterBy.ctg) {
      case 'all':
        mails = mails.filter(
          (mail) =>
            mail.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
            mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase())
        )
        return Promise.resolve(mails)
      case 'inbox':
        mails = mails.filter((mail) => mail.to === loggedinUser.email && !mail.isDraft&& !mail.isDeleted)
        break
      case 'starred':
        mails = mails.filter((mail) => mail.isStar && !mail.isDraft&& !mail.isDeleted)
        break
      case 'draft':
        mails = mails.filter((mail) => mail.isDrafted && !mail.isDeleted)
        return Promise.resolve(mails)
      case 'deleted':
        mails = mails.filter((mail) => mail.isDeleted)
        return Promise.resolve(mails)
      case 'sent':
        mails = mails.filter((mail) => mail.from.mail === loggedinUser.email&&!mail.isDeleted&&!mail.isDraf)
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
  return Promise.resolve(mails)
}
function getUnreadEmails() {
  let mails = _loadFromStorage()
  if (!mails) return
  let x = mails.filter(mail => mail.isRead === false && mail.to === 'user@appsus.com' && !mail.isDeleted && !mail.isDraft)
  return x.length

}
function addMail(mailData) {
  let mails = _loadFromStorage()
  const newMail = {
    id: utilService.makeId(),
    subject: mailData.subject,
    body: mailData.txt,
    isStar: false,
    isRead: false,
    isDraft: false,
    isDeleted: false,
    sentAt: Date.now(),
    to: mailData.to,
    img: mailData.url,
    noteType:mailData.noteType,
    from: {mail:loggedinUser.email,
      userName:loggedinUser.fullname,
      imgSrc:'//ssl.gstatic.com/ui/v1/icons/mail/profile_mask2.png'
    },
  }
  mails = [newMail, ...mails]
  _saveToStorage(mails)

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

  let mailToDelete = getMailById(mailId)
  if(!mailToDelete.isDeleted){
    mailToDelete.isDeleted = true
    mails = mails.map((mail) =>
      mail.id === mailToDelete.id ? mailToDelete : mail
    )
  }else{
    mails = mails.filter((mail) => mail.id !== mailToDelete.id)
  }
  console.log(mails)
  _saveToStorage(mails)
  return Promise.resolve()
}
function _createMails() {
  return [
    {
      id: utilService.makeId(),
      subject: 'Sprint 3 desk meeting ,will end with happy hour!',
      body: 'Would love to catch up somezxctimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now() - 60 * 60 * 3,
      to: 'momo@momo.com',
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Its been to long mate .... !',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident deserunt ab quos placeat ut doloribus doloremque incidunt maxime atque animi, magni expedita quibusdam quas commodi tenetur, rerum autem accusamus quidem.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'user@appsus.com',
      from: {
        mail: 'OriSason@appsus.com',
        userName: 'Ori Sason',
        imgSrc: '../../../assets/img/mail/ori.jpg'
      },
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
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes sssssssyyysssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now() - 1000 * 60 * 20,
      to: 'user@appsus.com',
      from: 
      {mail:'mAharoni@appsus.com',
        userName:'Michael Aharoni',
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Are you ready? ',
      body: 'Would love to catch up sasdaswavxcbgjnometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
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
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch qwewqgrefddsup sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now() - 1000 * 60 * 8,
      to: 'user@appsus.com',
      from: 
      {mail:'KimKardeshian@appsus.com',
        userName:'KimKardeshian',
        imgSrc:'../../../assets/img/mail/kimk.jpg'
      },
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
      from: {mail:loggedinUser.email,
              userName:loggedinUser.fullname,
              imgSrc:'../../../assets/img/mail/noimage.jpg'
            },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: '../../../assets/img/mail/noimage.jpg'

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now(),
      to: 'momo@momo.com',
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
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
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
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
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
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
      from: {mail:loggedinUser.email,
        userName:loggedinUser.fullname,
        imgSrc:'../../../assets/img/mail/noimage.jpg'
      },
    },
  ]
}
function _loadFromStorage() {
  return storageService.loadFromStorage(MAIL_STORAGE_KEY)
}

function _saveToStorage(mails) {
  storageService.saveToStorage(MAIL_STORAGE_KEY, mails)
}
