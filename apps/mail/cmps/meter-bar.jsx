import {eventBusService} from '../../../services/event.bus.service.js'
import {mailService} from '../services/mail.service.js'


export class MeterBar extends React.Component{
    
    state={
     countValue:0
    }
    componentDidMount() {
        eventBusService.on('change-meter',(unreadCount)=>{
            console.log(unreadCount)
            mailService.getMailsCount().then((inCount)=>{
                this.setState({countValue:100-parseInt((unreadCount/inCount)*100)})
            })

        })
        
    }
    render(){

        const{countValue} =this.state
        return <div className="meter-bar">

        <meter value={countValue} low='33' optimum='0' high='70' min='0' max='100' className="meter-bar">

        </meter>
        <span className="meter-precent">{countValue}%</span>


        </div>
    }
}