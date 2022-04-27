const { Route, Switch, NavLink } = ReactRouterDOM

export class MailSections extends React.Component {
  render() {
    return (
      <div className="mail-typs-nav">
        <NavLink
          className="inbox-nav"
          to="/mail/inbox"
          onClick={() => {
            this.props.changeCtg('inbox')
          }}
        >
          <div className="mail-sect-inbox"></div>
          <div className="inbox">Inbox</div>
        </NavLink>

        <NavLink
          to="/mail/starred"
          onClick={() => {
            this.props.changeCtg('starred')
          }}
        >
          <div className="mail-sect-starred"></div>
          <div className="starred">Starred</div>
        </NavLink>

        <NavLink
          to="/mail/sent"
          onClick={() => {
            this.props.changeCtg('sent')
          }}
        >
          <div className="mail-sect-sent"></div>
          <div className="sent">Sent</div>
        </NavLink>

        <NavLink
          to="/mail/draft"
          onClick={() => {
            this.props.changeCtg('draft')
          }}
        >
          <div className="mail-sect-drafts"></div>
          <div className="draft">Drafts</div>
        </NavLink>
        <NavLink
          to="/mail/deleted"
          onClick={() => {
            this.props.changeCtg('deleted')
          }}
        >
          <div className="mail-sect-deleted"></div>
          <div className="deleted">Trash</div>
        </NavLink>
        <NavLink
          to="/mail/all"
          onClick={() => {
            this.props.changeCtg('all')
          }}
        >
          <div className="mail-sect-all"></div>
          <div className="deleted">All</div>
        </NavLink>

        {/* <div onClick={()=>{
            this.props.changeSection('sent')}
        } className="mail-sect-sent">Sent</div>

        <div onClick={()=>{
            this.props.changeSection('draft')}
        } className="mail-sect-drafts">Drafts</div>

        <div onClick={()=>{
            this.props.changeSection('deleted')}
        } className="mail-sect-deleted">Deleted</div>

        <div onClick={()=>{
            this.props.changeSection('all')}
            } className="mail-sect-all">All</div> */}
      </div>
    )
  }
}
