import { bookService } from '../services/book.service.js'

import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { AddBook } from '../cmps/add-book.jsx'

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
    isAddBookShown: false
  }

  componentDidMount() {
    this.loadBooks()
  }

  loadBooks = () => {
    bookService
      .query(this.state.filterBy)
      .then((books) => this.setState({ books }))
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks)
  }

  onShowAddBook = () => {
    this.setState({ isAddBookShown: !this.state.isAddBookShown })
  }

  render() {
    const { books, filterBy, isAddBookShown } = this.state

    return (
      <section className="books-app main-layout">
        <header>
          <button className='btn' onClick={this.onShowAddBook}>{isAddBookShown ? 'Show Miss Book\'s books list' : 'Add book from Google'}</button>
          {!isAddBookShown && <BookFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />}
        </header>
        <main>
          {!isAddBookShown && <BookList books={books} />}
          {isAddBookShown && isAddBookShown && <AddBook books={books} />}
        </main>
      </section>
    )
  }
}
