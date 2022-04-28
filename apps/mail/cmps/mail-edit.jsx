
const {Link} = ReactRouterDOM
export class MaleEdit extends React.Component{

    state={
        txt:'',
        to:'',
        subject:'',
    }
    onChangeValue=({target})=>{
        const field = target.name
        const value = target.value
        this.setState(prevState=>({...prevState,[field]:value}))
    }
    addNewMail=(ev)=>{
        ev.preventDefault()

    }
    onAddImage=()=>{

    }
    render(){
        const {txt,to,subject} =this.state
        return <form onSubmit={this.addNewMail} className="edit-mail">
            <div className="mail-new-msg-header">
                <h1 className="mail-new">New Message</h1>
                <Link className="mail-open-newpage"></Link>
                <Link className="mail-close">x</Link>
            </div>
        <input    onChange={this.onChangeValue} placeholder='To:' name='to' type="email" value={to} className="mail-edit-to" />
        <input    onChange={this.onChangeValue} placeholder='Subject' name='subject' type="text" value={subject} className="mail-edit-subject" />
        <img src="" />
        <textarea onChange={this.onChangeValue} placeholder='Write here...' name="txt" id="" cols="50" rows="30"></textarea>
        <div className="add-btns">
        <button className="add-new-mail-btn">Send</button>
        <a href="" onClick={this.onAddImage} className="mail-add-img"></a>
        <a href="" className="mail-add-note">note</a>
        <a href="" className="mail-add-emoji">😎</a>
        </div>
        </form>
    }
}