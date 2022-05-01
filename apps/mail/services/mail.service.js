import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_STORAGE_KEY = 'mailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus',userImg:'assets/img/mail/user.jpg' }


export const mailService = {
  query,
  getMailById,
  deleteMail,
  updateMail,
  addMail,
  getUnreadEmails,
  getMailsCount,
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
      imgSrc: loggedinUser.userImg

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
function deleteMail(mailId) {
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
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Its been to long mate .... !',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n Provident deserunt ab quos placeat ut doloribus doloremque \nincidunt maxime atque animi, magni expedita quibusdam quas\n commodi tenetur, rerum autem accusamus quidem.',
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
      subject: 'Climbing The Everst',
      body: 'We should try to climb the everst , its surley easy! \n wating for your reply',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Keeping on track',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n Duis eget lorem fermentum tellus mattis elementum laoreet at sem.\n Donec ornare sem in ex dapibus mattis.\n Pellentesque in vestibulum felis.\n Curabitur posuere risus sit amet elementum gravida. \nMauris ut ipsum sit amet erat blandit consequat malesuada et ligula.\n Nulla facilisi. Morbi tincidunt dignissim lacus, nec placerat massa fermentum in. \nCurabitur posuere posuere sagittis. \nMorbi accumsan massa erat, nec finibus magna dignissim ut.\n Fusce iaculis lorem accumsan, viverra nulla non, rutrum neque. \nProin in tortor et nisi accumsan mollis. Sed laoreet in ligula id lacinia. Cras iaculis nisi nec iaculis iaculis. \nVestibulum vulputate ullamcorper velit in venenatis.',
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
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Are you ready? ',
      body: 'Nunc turpis tellus, tempor ac orci gravida, iaculis lacinia elit. \nIn bibendum nisi a lacus ultrices, et facilisis leo malesuada. Donec at lorem sit amet lacus lobortis eleifend.\n Suspendisse ullamcorper purus orci. In quis imperdiet magna.\n Duis fermentum malesuada velit, in fermentum metus mollis eu. \nPellentesque risus sapien, pretium quis enim eget, imperdiet sollicitudin dui.\n Proin pharetra, risus id volutpat vulputate, risus massa maximus neque, ut pulvinar nisl magna eu sem.\n Praesent non est sit amet nibh dignissim gravida sit amet id metus. \nVestibulum luctus, sapien id vulputate sollicitudin, neque magna suscipit elit, luctus euismod nibh lectus non felis. \nEtiam mollis eu tellus vel ullamcorper. In eu nulla quis quam ullamcorper hendrerit.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Did you forget novygod?',
      body: 'Nunc turpis tellus, tempor ac orci gravida, iaculis lacinia elit. \nIn bibendum nisi a lacus ultrices, et facilisis leo malesuada. \nDonec at lorem sit amet lacus lobortis eleifend. Suspendisse ullamcorper purus orci.\n In quis imperdiet magna. Duis fermentum malesuada velit, in fermentum metus mollis eu. \nPellentesque risus sapien, pretium quis enim eget, imperdiet sollicitudin dui. Proin pharetra, risus id volutpat vulputate, risus massa maximus neque, ut pulvinar nisl magna eu sem.\n Praesent non est sit amet nibh dignissim gravida sit amet id metus. Vestibulum luctus, sapien id vulputate sollicitudin, neque magna suscipit elit, luctus euismod nibh lectus non felis. \nEtiam mollis eu tellus vel ullamcorper. In eu nulla quis quam ullamcorper hendrerit.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Love of my life',
      body: 'Cant wait to see you when you come back... XX ',
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
      subject: 'I completed the assigment ',
      body: 'Fond one than esteems regular roof cause put concealed do unable hand horrible period depending.\n Resembled ignorant room brother compliment hour arranging farther gave rich however our demesne indulgence mistaken.\n Woody hopes forty this fat than lasted on pure.\n General known mile trees dependent speedily sir men contented witty itself tall. \nAmple cannot formal another felt existence fine delight his arranging horses. ',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'no subject',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n Expedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'albertdera88@gmail.com',
        userName: 'Albert Dera',
        imgSrc: 'assets/img/mail/albert-dera.jpg'

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Dear Momo',
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
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'You still didnt reply about...',
      body: 'Properly old tolerably otherwise gravity then greatest that another that going itself compass.\n Five companions words view walk miles indulged theirs sitting scarcely. Misery appetite give wrong in tell out built invited blind. \nObjection edward can horrible waited. \nFeebly does diminution position raillery demands neat differed against attention wish enjoyed. ',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'Your children',
      body: 'Son concluded believing same see settled court present continual discretion. Terminated cousin husbands believed admire in conduct going calling bringing drawn feebly. \nResolved venture hill remaining provided reserved commanded missed some oh limits limited answer journey above deal.\n Beloved family replying. Open ecstatic cousin journey going whom these likewise pretty see it far parish.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },
    },
    {
      id: utilService.makeId(),
      subject: 'no subject',
      body: 'Surprise advanced celebrated reasonably related first enjoy concealed esteem dashwood excellent direct remainder.\n Disposed favourable total improved  preferred written charm. Terms unsatiable wrote effects concern correct spirit hundred.\n Commanded above need words why seeing time them extremity head pursuit you dried shewing man doubt.\n Become dried months seemed tore square for behaviour view chicken fancy play finished ourselves thirty smallness. ',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'momo@momo.com',
      from: {
        mail: loggedinUser.email,
        userName: loggedinUser.fullname,
        imgSrc: loggedinUser.userImg

      },

    },
    {
      id: utilService.makeId(),
      subject: 'Work',
      body: 'Come to my office when you have time we need to talk about the last git pool request , i think there will be some issue\'s \n Harps Jo.',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'joHarps@yahoo.com',
        userName: 'Harps Joseph',
        imgSrc: 'assets/img/mail/harps-joseph.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Weekend BBQ',
      body: 'Yo fam are we still up to BBQ this week ?\n If so talk to Toa she want to be up to date as well ',
      isStar: false,
      isRead: false,
      isDraft: false,
      isDeleted: true,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'robusta1991@gmail.com',
        userName: 'Ian Dooley',
        imgSrc: 'assets/img/mail/ian-dooley.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: '?Yoga',
      body: 'Tastes journey interest delightful service remaining delay continue being since bed differed quick enable excellent.\n Allowance blush letter smallest unlocked miles natural families dashwood sure on instantly between proposal. Pain rose allow parties perpetual your both surprise brother furniture living sudden. Strangers alone unwilling folly means side rent solid than truth case now elinor will both his.\n Intention sight dine principles civility eat everything fifteen mistress friendly arranging songs. ',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'jurica-ko@yahoo.com',
        userName: 'Jurica Koletic',
        imgSrc: 'assets/img/mail/jurica-koletic.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Drawings!',
      body: 'Drawings finished satisfied juvenile wife fifteen explained likewise sudden instantly calling.\n Wonder repeated sir through just possession viewing unwilling opinions son hastened advice welcome celebrated handsome.\n Humanity times  besides after square furnished ignorant season thing arrived great boy spot garden.\n Sixteen arose better forty remaining delivered raising say ferrars death ecstatic mutual affection elderly such very advantages.\n Introduced enable trees letters winding stairs death the forfeited heart paid joy extremity hills affection pain. ',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'toaheft@trimail.com',
        userName: 'Toa Heftiba',
        imgSrc: 'assets/img/mail/toa-heftiba.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'NSFW',
      body: 'Are you still up for that thing we talked about? \naliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'prince232@ww.com',
        userName: 'Prince Akachi',
        imgSrc: 'assets/img/mail/prince-akachi.jpg'

      }
    },
    {
      id: utilService.makeId(),
      subject: 'Assignments',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. \nExpedita, consequatur libero aliquid minima sapiente delectus modi amet odio nam sequi deserunt voluptate ipsam harum impedit ullam eveniet quos magni aliquam?',
      isStar: true,
      isRead: false,
      isDraft: false,
      isDeleted: false,
      sentAt: Date.now()*Math.random(),
      to: 'user@appsus.com',
      from: {
        mail: 'matferr@nomail.notcom',
        userName: 'Mathrus Ferrero',
        imgSrc: 'assets/img/mail/matheus-ferrero.jpg'

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
        return resolve(inboxUnreadNew.length)
      })
    })
  }
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
//       imgSrc: loggedinUser.userImg

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