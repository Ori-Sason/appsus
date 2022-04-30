
import {eventBusService} from '../../../services/event.bus.service.js'



export class SearchFilter extends React.Component{
    state ={
        filterBy:{
            txt:'',
            type:''
        }
    }
    
    onFilter = (ev) => {
        ev.preventDefault()
        eventBusService.emit('changeFilter',this.state.filterBy)
      }
      onChangeFilterStats = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(
          (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
          () => eventBusService.emit('changeFilter',this.state.filterBy)
        )
      }
     
    render(){
        const {txt} = this.state.filterBy
        return <div className="search-filter">
            <input type="text" name='txt' placeholder='Search mail' autoComplete="off" onChange={this.onChangeFilterStats} value ={txt} className="mail-input-search no-focus-visible" />
            <select onChange={this.onChangeFilterStats} name="type" id="" className="mail-select-filterby">
            <option value="">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
            </select>
        </div>
    }
}