import { utilService } from '../../../services/util.service.js'

const { withRouter } = ReactRouterDOM

export function _BookPreview({ book, history }) {
  return (
    <article
      className="book-preview"
      onClick={() => history.push(`/book/${book.id}`)}
    >
      <div className="book-title">
        <h3> {book.title} </h3>
      </div>
      <img src={book.thumbnail} alt={book.title} />
      <p className="price">
        <strong>Price:</strong>{' '}
        {utilService.getCurrencySymbol(
          book.listPrice.amount,
          book.listPrice.currencyCode
        )}
      </p>
    </article>
  )
}

export const BookPreview = withRouter(_BookPreview)
