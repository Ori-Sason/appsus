const { withRouter } = ReactRouterDOM
import { bookService } from '../services/book.service.js'

export class _AddBook extends React.Component {
    state = {
        books: [],
        searchKey: ''
    }

    onInputChange = ({ target }) => {
        this.setState((prevState) => ({ ...prevState, searchKey: target.value }))
    }

    onSearch = () => {
        bookService.getGoogleBooks(this.state.searchKey)
            .then(books => this.setState({ books }))
    }

    onAddBook = (bookId) => {
        bookService.addGoogleBook(bookId).then(book => this.props.history.push(`/book/${book.id}`))
    }

    render() {
        const { books } = this.state
        return <section className="add-book">
            <form onSubmit={this.onSearch}>
                <input type="text" onChange={this.onInputChange} className="input-text" placeholder="Enter book name" />
                <button type="submit" className="btn">Search</button>
            </form>
            {books.length > 0 && <ul className='clean-list'>
                {books.map(book => <li key={book.id}>
                    <button className='btn btn-small' onClick={() => this.onAddBook(book.id)} >+</button> {book.title}
                </li>)}
            </ul>}
        </section >
    }
}

export const AddBook = withRouter(_AddBook)