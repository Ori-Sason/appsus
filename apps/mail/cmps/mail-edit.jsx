import { mailService } from '../services/mail.service.js'
const {Link} = ReactRouterDOM
export class MaleEdit extends React.Component{

    state={
        txt:'',
        to:'',
        subject:'',
        isOpen: true,
         url: ''

    }
    onChangeValue=({target})=>{
        const field = target.name
        const value = target.value
        this.setState(prevState=>({...prevState,[field]:value}))
    }
    addNewMail=(ev)=>{
        ev.preventDefault()
        const{txt,to} =this.state
        if(txt&&to){
            console.log(this.state)
            mailService.addMail(this.state)
            this.props.history.push('/mail')
        }else{
            console.log('not mail or TXT')
        }

    }
    onSelectImg = (ev) => {

        const loadImageFromInput = (ev, onImageReady) => {
            var reader = new FileReader()

            reader.onload = (event) => {
                var img = new Image()
                img.src = event.target.result
                img.onload = onImageReady.bind(null, img)
            }
            reader.readAsDataURL(ev.target.files[0])
        }

        const renderImg = (img) => {
            this.setState((prevState) => ({ ...prevState, type: 'note-img', isOpen: true, url: img.src }))
        }

        loadImageFromInput(ev, renderImg)
    }

    render(){
        const {txt,to,subject,isOpen,url} =this.state
        return <form onSubmit={this.addNewMail} className="edit-mail">
            <div className="mail-new-msg-header">
                <h1 className="mail-new">New Message</h1>
                <div className="headr-links">
                <Link className="fa fa-expand"></Link>
                <Link className="fa fa-times"></Link>

                </div>
            </div>
        <input    onChange={this.onChangeValue} placeholder='To:'autoComplete='none' title='Recipient' name='to' type="email" value={to} className="mail-edit-to" />
        <input    onChange={this.onChangeValue} placeholder='Subject:' autoComplete='none'title='Subject' name='subject' type="text" value={subject} className="mail-edit-subject" />
        <textarea onChange={this.onChangeValue} placeholder='Write here...'autoComplete='none' name="txt" id="" cols="50" rows="30"></textarea>
        {isOpen&&<img className='mail-user-added-img' src={url}/>}
        <div className="add-btns">
        <button className="add-new-mail-btn">Send</button>
        <div className='invisible-btn-mail'>
                        <div className="mail-add-img"></div>
                        <input type="file" onChange={this.onSelectImg}className='im-inputfkfk'  accept="image/png, image/gif, image/jpeg" />
                    </div>
        <a href="" className="mail-add-note">note</a>
        <a href="" className="mail-add-emoji">😎</a>
        </div>
        </form>
    }
}