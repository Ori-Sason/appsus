

const { Route, Switch, NavLink } = ReactRouterDOM


export class MailSections extends React.Component{




render(){

    
    return <div className="mail-typs-nav">
        {/* <div className="mail-inbox-nav">
        <div onClick={()=>{
            
            this.props.changeSection('inbox')}
        } className="inbox">Inbox</div>
        <div className="mail-sect-inbox"></div>

        </div> */}
        <NavLink  to="/mail/">
        <div onClick={()=>{
            
            this.props.changeSection('inbox')}
        } className="inbox">Inbox</div>
        <div className="mail-sect-inbox"></div>


        </NavLink>

        <div onClick={()=>{
            this.props.changeSection('starred')}
        } className="mail-sect-starred">Starred</div>


        <div onClick={()=>{
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
            } className="mail-sect-all">All</div>
    </div>
}
}