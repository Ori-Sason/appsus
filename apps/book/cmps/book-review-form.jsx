import { bookService } from '../services/book.service.js'
import { StarsRate } from '../cmps/stars-rate.jsx'

export class BookReviewForm extends React.Component {
  state = {
    reviewer: 'Books Reader',
    rate: 0,
    readDate: new Date().toISOString().substring(0, 10),
    txt: '',
  }

  focusRef = React.createRef()

  componentDidMount() {
    this.focusRef.current.focus()
  }

  onChangeInput = ({ target }) => {
    const { type, name } = target

    let value = target.value
    if (type === 'date')
      value = new Date(target.value).toISOString().substring(0, 10)
    else if (name === 'rate') value = +value

    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    bookService.addReview(this.props.book.id, this.state).then(this.props.onUpdateBook)
  }

  onChangeRate = (rate) => {
    this.setState((prevState) => ({ ...prevState, rate }))
  }

  render() {
    return (
      <section className="review-form">
        <h2>Add a review</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="read-reviewer" ref={this.focusRef}>Your Name</label>
          <input type="text" name="reviewer" id="read-reviewer" value={this.state.reviewer} onChange={this.onChangeInput} required />

          <p>Rate</p>
          <StarsRate rate={this.state.rate} onChangeRate={this.onChangeRate} />

          <label htmlFor="read-date">Reading date</label>
          <input type="date" name="readDate" id="read-date" value={this.state.readDate} onChange={this.onChangeInput} required />

          <label htmlFor="review-text">Write your review</label>
          <textarea name="txt" id="review-text" value={this.state.txt} onChange={this.onChangeInput}></textarea>

          <button className="btn" type="submit">Add</button>
        </form>
      </section>
    )
  }
}
