import { bookService } from '../services/book.service.js'
import { utilService } from '../../../services/util.service.js'
import { BookReviewForm } from '../cmps/book-review-form.jsx'
import { BookReviewList } from '../cmps/book-reviews-list.jsx'
import { LongTxt } from '../../../cmps/long-txt.jsx'

export class BookDetails extends React.Component {
  state = {
    book: null,
    isLongTxtShown: false,
    showReviewForm: false,
  }

  componentDidMount() {
    this.loadBook()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  loadBook = () => {
    const bookId = this.props.match.params.bookId
    bookService.getBookById(bookId).then((book) => {
      if (!book) return this.props.history.push('/book')
      this.setState({ book })
    })
  }

  getPageCountDisplayText(num) {
    if (num > 500) return `${num}, Long reading`
    if (num > 200) return `${num}, Decent reading`
    if (num < 100) return `${num}, Light reading`
    return num
  }

  getPublishedDateDisplayText(year) {
    const currYear = new Date().getFullYear()
    const diff = currYear - year
    if (diff > 10) return `${year}, Veteran Book`
    if (diff < 1) return <span className='year-image'>{year} <img src='../../../assets/img/book/new.png'></img></span>
    return year
  }

  getLanguageText(lang) {
    switch (lang) {
      case 'en': return 'English'
      case 'he': return 'Hebrew'
      case 'sp': return 'Spanish'
      default: return lang
    }
  }

  getClassNameByPrice(price) {
    if (price > 150) return 'high-price'
    if (price < 20) return 'low-price'
    return ''
  }

  onChangeShownText = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }

  onUpdateBook = (book) => {
    this.setState({ book, showReviewForm: false })
  }

  onChangePage = (bookId, diff) => {
    bookService.getNextBook(bookId, diff)
      .then(book => this.setState({ book: book, isLongTxtShown: false, showReviewForm: false }))
  }

  render() {
    const { book, showReviewForm } = this.state
    if (!book) return <h2>Loading....</h2>

    return (
      <section className="book-details">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <ul className="clean-list">
          <li>
            <strong>Written by:</strong> {book.authors.map((author) => author).join(', ')}</li>
          <li>
            <div className="img-container">
              {book.listPrice.isOnSale && (<img className="on-sale-img" src="../../../assets/img/book/on-sale.png" alt="" />)}
              <img className="book-img" src={book.thumbnail} alt={book.title} />
            </div>
          </li>
          <li>
            <strong>Publish Year:</strong> {this.getPublishedDateDisplayText(book.publishedDate)}
          </li>
          <li>
            <strong>Description:</strong> <LongTxt txt={book.description} isLong={this.state.isLongTxtShown} onChangeShownText={this.onChangeShownText} />
          </li>
          <li>
            <strong>Number of Pages:</strong> {this.getPageCountDisplayText(book.pageCount)}
          </li>
          <li>
            <strong>Categories:</strong> {book.categories.map((category) => category).join(', ')}
          </li>
          <li>
            <strong>Language:</strong> {this.getLanguageText(book.language)}
          </li>
          <li>
            <strong>Price:</strong>{' '}
            <span className={this.getClassNameByPrice(book.listPrice.amount)}>
              {utilService.getCurrencySymbol(book.listPrice.amount, book.listPrice.currencyCode)}
            </span>
          </li>
        </ul>

        {showReviewForm && (
          <BookReviewForm book={book} onUpdateBook={this.onUpdateBook} />
        )}

        <div className='btn-container'>
          <button className="btn" onClick={() => this.onChangePage(book.id, -1)}>←</button>
          <button className="btn" onClick={() => this.props.history.push('/book')}>Back to list</button>

          {!showReviewForm && (
            <button className="btn" onClick={() => this.setState({ showReviewForm: true })}>
              Add a review
            </button>
          )}

          <button className="btn" onClick={() => this.onChangePage(book.id, 1)}>→</button>
        </div>

        <BookReviewList book={book} onUpdateBook={this.onUpdateBook} />
      </section>
    )
  }
}
