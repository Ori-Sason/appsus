import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
let firstMail

export const mailService = {
  query,
  getMailById,
  deleteMailById,
  updateMail,
  addMail,
  getUnreadEmails,
  getMailsCount,
  // addDraft,
  // deleteDraft
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
        mails = mails.filter((mail) => mail.to === loggedinUser.email && !mail.isDraft && !mail.isDeleted)
        break
      case 'starred':
        mails = mails.filter((mail) => mail.isStar && !mail.isDraft && !mail.isDeleted)
        break
      case 'draft':
        mails = mails.filter((mail) => mail.isDraft && !mail.isDeleted)
        return Promise.resolve(mails)
      case 'deleted':
        mails = mails.filter((mail) => mail.isDeleted)
        return Promise.resolve(mails)
      case 'sent':
        mails = mails.filter((mail) => mail.from.mail === loggedinUser.email && !mail.isDeleted && !mail.isDraf)
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
  firstMail = mails
  return Promise.resolve(mails)
}
function getUnreadEmails() {
  let mails = _loadFromStorage()
  if (!mails) {
    return new Promise(resolve=>{
      query(null).then((mailsFromQuery)=>{
        let sortedQuery = mailsFromQuery.filter(mail => mail.isRead === false && mail.to === 'user@appsus.com' && !mail.isDeleted && !mail.isDraft)
        return resolve(sortedQuery.length)
      })
    })
  
  }
  let sortedMails = mails.filter(mail => mail.isRead === false && mail.to === 'user@appsus.com' && !mail.isDeleted && !mail.isDraft)
  return Promise.resolve(sortedMails.length)

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
    noteType: mailData.noteType,
    from: {
      mail: loggedinUser.email,
      userName: loggedinUser.fullname,
      imgSrc: '//ssl.gstatic.com/ui/v1/icons/mail/profile_mask2.png'
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
  if (!mailToDelete.isDeleted) {
    mailToDelete.isDeleted = true
    mails = mails.map((mail) =>
      mail.id === mailToDelete.id ? mailToDelete : mail
    )
  } else {
    mails = mails.filter((mail) => mail.id !== mailToDelete.id)
  }
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
      sentAt: Date.now()*Math.random() - 60 * 60 * 3,
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'OriSason@appsus.com',
        userName: 'Ori Sason',
        imgSrc: 'assets/img/mail/ori.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget lorem fermentum tellus mattis elementum laoreet at sem. Donec ornare sem in ex dapibus mattis. Pellentesque in vestibulum felis. Curabitur posuere risus sit amet elementum gravida. Mauris ut ipsum sit amet erat blandit consequat malesuada et ligula. Nulla facilisi. Morbi tincidunt dignissim lacus, nec placerat massa fermentum in. Curabitur posuere posuere sagittis. Morbi accumsan massa erat, nec finibus magna dignissim ut. Fusce iaculis lorem accumsan, viverra nulla non, rutrum neque. Proin in tortor et nisi accumsan mollis. Sed laoreet in ligula id lacinia. Cras iaculis nisi nec iaculis iaculis. Vestibulum vulputate ullamcorper velit in venenatis.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random() - 1000 * 60 * 20,
      to: 'user@appsus.com',
      from:
      {
        mail: 'mAharoni@appsus.com',
        userName: 'Michael Aharoni',
        imgSrc: 'assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Are you ready? ',
      body: 'Nunc turpis tellus, tempor ac orci gravida, iaculis lacinia elit. In bibendum nisi a lacus ultrices, et facilisis leo malesuada. Donec at lorem sit amet lacus lobortis eleifend. Suspendisse ullamcorper purus orci. In quis imperdiet magna. Duis fermentum malesuada velit, in fermentum metus mollis eu. Pellentesque risus sapien, pretium quis enim eget, imperdiet sollicitudin dui. Proin pharetra, risus id volutpat vulputate, risus massa maximus neque, ut pulvinar nisl magna eu sem. Praesent non est sit amet nibh dignissim gravida sit amet id metus. Vestibulum luctus, sapien id vulputate sollicitudin, neque magna suscipit elit, luctus euismod nibh lectus non felis. Etiam mollis eu tellus vel ullamcorper. In eu nulla quis quam ullamcorper hendrerit.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Nunc turpis tellus, tempor ac orci gravida, iaculis lacinia elit. In bibendum nisi a lacus ultrices, et facilisis leo malesuada. Donec at lorem sit amet lacus lobortis eleifend. Suspendisse ullamcorper purus orci. In quis imperdiet magna. Duis fermentum malesuada velit, in fermentum metus mollis eu. Pellentesque risus sapien, pretium quis enim eget, imperdiet sollicitudin dui. Proin pharetra, risus id volutpat vulputate, risus massa maximus neque, ut pulvinar nisl magna eu sem. Praesent non est sit amet nibh dignissim gravida sit amet id metus. Vestibulum luctus, sapien id vulputate sollicitudin, neque magna suscipit elit, luctus euismod nibh lectus non felis. Etiam mollis eu tellus vel ullamcorper. In eu nulla quis quam ullamcorper hendrerit.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
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
      sentAt: Date.now()*Math.random() - 1000 * 60 * 8,
      to: 'user@appsus.com',
      from:
      {
        mail: 'KimKardeshian@appsus.com',
        userName: 'KimKardeshian',
        imgSrc: 'assets/img/mail/kimk.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
      },
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
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
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: 'assets/img/mail/noimage.jpg'
      },

    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'randomPerson@nomail.notcom',
        userName: 'Rand Randomiyahu',
        imgSrc: 'assets/img/mail/noimage.jpg'

      }
    },
  ]
}
function _loadFromStorage() {
  return storageService.loadFromStorage(MAIL_STORAGE_KEY)
}

function _saveToStorage(mails) {
  storageService.saveToStorage(MAIL_STORAGE_KEY, mails)
}
function getMailsCount() {
  const mails = _loadFromStorage()
  if(!mails){
    return new Promise(resolve=>{
      query(null).then((mailsFromQuery)=>{
        let inboxUnreadNew = mailsFromQuery.filter((mail) => mail.to === loggedinUser.email && !mail.isDraft && !mail.isDeleted)
       console.log(inboxUnreadNew.length)
        return resolve(inboxUnreadNew.length)
      })
    })
  }
  console.log(mails)
  let inboxUnread = mails.filter((mail) => mail.to === loggedinUser.email && !mail.isDraft && !mail.isDeleted)
  return Promise.resolve(inboxUnread.length)
}
// function deleteDraft(mailDraft) {

// }
// function addDraft(mailDraft) {
  
 
//   const newMail = {
//     id: mailDraft.draftId,
//     subject: mailDraft.subject,
//     body: mailDraft.txt,
//     isStar: false,
//     isRead: false,
//     isDraft: true,
//     isDeleted: false,
//     draftedAt: Date.now()*Math.random(),
//     to: mailDraft.to,
//     img: mailDraft.url || '',
//     noteType: mailDraft.noteType || '',
//     from: {
//       mail: loggedinUser.email,
//       userName: loggedinUser.fullname,
//       imgSrc: '//ssl.gstatic.com/ui/v1/icons/mail/profile_mask2.png'
//     },
//   }
//   let mails = _loadFromStorage()

//   let isUpdate = mails.findIndex((mail) => {
//     mail.id === mailDraft.draftId 
//   })
//   mails = mails.map((mail) =>
//   mail.id === newMail.id ? newMail : mail
// )
//   _saveToStorage(mails)
// }