import { bookService } from '../services/book.service.js'

export class BookFilter extends React.Component {
  state = {
    maxPrice: 0,
    filterBy: { name: '', price: 0 },
  }

  componentDidMount() {
    this.loadMaxPrice()
  }

  loadMaxPrice() {
    return bookService
      .getBooksMaxPrice()
      .then((res) => this.setState({ maxPrice: res }))
  }

  onChangeInput = (ev) => {
    const { name: field, type, value, valueAsNumber } = ev.target
    const result = type === 'range' ? valueAsNumber : value

    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: result } }),
      () => this.props.onSetFilter(this.state.filterBy)
    )
  }

  render() {
    return (
      <section className="book-filter">
        <ul className="clean-list">
          <li>
            <label htmlFor="book-name">Name</label>
            <input type="text" className='input-text' id="book-name" name="name" onChange={this.onChangeInput} />
          </li>
          <li>
            <label htmlFor="book-max-price">Price</label>
            <input type="range" id="book-max-price" name="price" min={0} max={this.state.maxPrice} onChange={this.onChangeInput}
            />
            <span>{this.state.filterBy.price}</span>
          </li>
        </ul>
      </section>
    )
  }
}
