import { eventBusService } from '../services/event.bus.service.js'

export class UserMsg extends React.Component {
    state = {
        txt: '',
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

    

    onCloseMsg = () => {
        this.setState({ txt: null  })
        this.clearTimeout()
    }
    componentWillUnmount() {
        this.clearTimeout()
        this.removeEvent()
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