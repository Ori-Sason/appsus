



export class SearchFilter extends React.Component{
    state ={
        filterBy:{
            txt:'',
            type:''
        }
    }
    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
      }
      onChangeFilterStats = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(
          (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
          () => this.props.setFilter(this.state.filterBy)
        )
      }
      
    render(){
        const {txt} = this.state.filterBy
        return <div className="search-filter">
            <input type="text" name='txt' onChange={this.onChangeFilterStats} value ={txt} className="mail-input-search" />
            <select onChange={this.onChangeFilterStats} name="type" id="" className="mail-select-filterby">
            <option value="">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
            </select>
        </div>
    }
}