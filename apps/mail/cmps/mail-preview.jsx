

export class MailPreveiw extends React.Component{
state={

}
componentDidMount() {
    const {mail} = this.props
    this.setState({mail})
}
toggleStar=()=>{
    const {mail} = this.state
    const {isStar} = this.state.mail
    this.setState((prevState)=>({mail:{...prevState.mail,isStar:!isStar}}),this.updateMail)
}
updateMail = ()=>{
    
}
render(){
    return <div  className="mail-preview">
       <div onClick={this.toggleStar} className="star">Star</div>     
</div>
}
}