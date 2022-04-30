import { eventBusService } from '../services/event.bus.service.js'

export class UserMsg extends React.Component {
    state = {
        txt: null,
        type: ''
    }

    removeEvent
    timeoutId = null

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            this.setState({ ...msg })
            if (this.timeoutId) this.clearTimeout()
            this.timeoutId = setTimeout(this.onCloseMsg, 3000)
        })
        
    }

    componentDidUpdate() {
        this.removeEvent()
        
    }

    onCloseMsg = () => {
        this.setState({ txt: null })
        this.clearTimeout()
    }

    clearTimeout() {
        clearTimeout(this.timeoutId)
    }

    render() {
        const { txt, type } = this.state
        if (!txt) return <React.Fragment></React.Fragment>
        return <section className={`user-msg ${type}`}>
            <button className='clean-btn fa fa-times' onClick={this.onCloseMsg}></button>
            <p>{txt}</p>
        </section>
    }
}