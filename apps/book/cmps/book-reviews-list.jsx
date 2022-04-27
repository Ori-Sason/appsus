import { eventBusService } from '../../../services/event.bus.service.js'
import { bookService } from "../services/book.service.js"

export function BookReviewList({ book, onUpdateBook }) {

  function onDeleteReview(bookId, reviewId) {
    bookService.deleteReview(bookId, reviewId).then(book => {
      eventBusService.emit('user-msg', { txt: 'Review was deleted successfully', type: 'success' })
      onUpdateBook(book)
    }).catch((err) => {
      eventBusService.emit('user-msg', { txt: 'Something went wrong.\nPlease try again.', type: 'danger' })
    })
  }

  function getRateInStars(rate) {
    return String.fromCharCode(9733).repeat(rate)
  }

  const { reviews } = book
  if (!reviews || reviews.length === 0) return ''

  return (
    <section className="reviews-list">
      <hr />
      <h2>Reviews</h2>
      <ol reversed>
        {[...reviews].reverse().map((review, idx) =>
          <li key={review.id}>
            <div>
              <div>
                <p><strong>Reviewer: </strong>{review.reviewer}</p>
                <p><strong>Rate: </strong>{getRateInStars(review.rate)}</p>
                <p><strong>Read Date: </strong>{review.readDate}</p>
                <p><strong>Review: </strong>{review.txt}</p>
              </div>
              <button className="btn btn-small" onClick={() => onDeleteReview(book.id, review.id)}>Delete</button>
            </div>
          </li>)}
      </ol>
    </section>
  )
}
