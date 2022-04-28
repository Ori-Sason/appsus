const { Route, Switch, NavLink } = ReactRouterDOM
import {eventBusService} from '../../../services/event.bus.service.js'


export class MailSections extends React.Component {
  
  changeCtg=(ctg)=>{
    eventBusService.emit('changeCtg',ctg)
  }
 

  render() {
    
    return (
      <div className="mail-typs-nav">
        <NavLink 
          className={`inbox-nav `}
          to="/mail/inbox"
          onClick={() => {
            this.changeCtg('inbox')
          }}
        >
          <div className="mail-sect-inbox"></div>
          <div className="inbox">Inbox</div>
        </NavLink>

        <NavLink
          to="/mail/starred"
          onClick={() => {
            this.changeCtg('starred')
          }}
        >
          <div className="mail-sect-starred"></div>
          <div className="starred">Starred</div>
        </NavLink>

        <NavLink
          to="/mail/sent"
          onClick={() => {
            this.changeCtg('sent')
          }}
        >
          <div className="mail-sect-sent"></div>
          <div className="sent">Sent</div>
        </NavLink>

        <NavLink
          to="/mail/draft"
          onClick={() => {
            this.changeCtg('draft')
          }}
        >
          <div className="mail-sect-drafts"></div>
          <div className="draft">Drafts</div>
        </NavLink>
        <NavLink
          to="/mail/deleted"
          onClick={() => {
            this.changeCtg('deleted')
          }}
        >
          <div className="mail-sect-deleted"></div>
          <div className="deleted">Trash</div>
        </NavLink>
        <NavLink
          to="/mail/all"
          onClick={() => {
            this.changeCtg('all')
          }}
        >
          <div className="mail-sect-all"></div>
          <div className="deleted">All</div>
        </NavLink>

      </div>
    )
  }
}
