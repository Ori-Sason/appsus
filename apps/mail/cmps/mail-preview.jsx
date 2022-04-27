

export class MailPreveiw extends React.Component{
state={
isHover:false
}
emptyStar = String.fromCharCode(9734)
fullStar = String.fromCharCode(9733)
componentDidMount() {
    const {mail} = this.props
    this.setState({mail})
}
mouseIn=()=>{
  
    this.setState({isHover:true})
}
mouseOut=()=>{
  
    this.setState({isHover:false})
}
toggleStar=()=>{
    const {mail} = this.state
    const {isStar} = this.state.mail
    this.setState((prevState)=>({mail:{...prevState.mail,isStar:!isStar}}),this.updateMail)
}
updateMail = ()=>{
    
}
render(){
    const {mail,isHover} = this.state

    if(!mail) return <React.Fragment></React.Fragment>
    return <div onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} className="mail-preview">
       <a  onClick={this.toggleStar} className={`star ${mail.isStar?'yellow':''}`}>{mail.isStar?this.fullStar:this.emptyStar}</a> 
       <h1 className="mail-subject">{mail.subject}</h1>
       <p className="mail-txt-content">{mail.body}</p>
       {isHover&& <div className="mail-prev-btns">

       <button className='mail-delete-btn'></button>
       <button className='mail-toggleread-btn fa fa-envelope-open'></button>
       </div>
       }
       

</div>
}
}