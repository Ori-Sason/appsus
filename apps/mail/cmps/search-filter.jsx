
import { eventBusService } from '../../../services/event.bus.service.js'



export class SearchFilter extends React.Component {
  state = {
    isSelected:false,
    filterBy: {
      txt: '',
      type: ''
    }
  }

  onFilter = (ev) => {
    ev.preventDefault()
    eventBusService.emit('changeFilter', this.state.filterBy)
  }
  onChangeFilterStats = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    if(target.className.includes('search-filter')){
      this.setState(
        (prevState) => ({ filterBy: { ...prevState.filterBy, type: target.innerText.toLowerCase() } }),
        () => eventBusService.emit('changeFilter', this.state.filterBy)
      )
      return
    }
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => eventBusService.emit('changeFilter', this.state.filterBy)
    )
  }
  toggleBtn=()=>{
    const{isSelected}=this.state
    this.setState({isSelected:!isSelected})
  }

  render() {
    const { txt } = this.state.filterBy
    const {isSelected} =this.state
    return <div className="search-filter">
      <input type="text" name='txt' placeholder='Search mail' autoComplete="off" onChange={this.onChangeFilterStats} value={txt} className="mail-input-search no-focus-visible" />
          <div onClick={this.toggleBtn}className={`filter-opts-container fa fa-${isSelected?'angle-down':'angle-left'}`}>
        {isSelected&&<div className="search-filter-opts">
          <div onClick={this.onChangeFilterStats} className="search-filter-all">All</div>
          <div onClick={this.onChangeFilterStats} className="search-filter-read">Read</div>
          <div onClick={this.onChangeFilterStats} className="search-filter-unread">Unread</div>
          </div>}
        </div>
        
      {/* <select onChange={this.onChangeFilterStats} name="type" id="" className="mail-select-filterby">
        <option value="">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select> */}
    </div>
  }
}