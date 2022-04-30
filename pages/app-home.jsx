const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home-page">
      <div className="home-body-container">

        <main>
          <div className="img-container">
            <img src="../assets/img/logo.png" alt="Appsus" />
          </div>
          <ul className="links clean-list">
            <li>
              <Link to="/book">
                <img src="../assets/img/pages/home/books.png" alt="books" />
                <p>Books</p>
              </Link>
            </li>

            <li>
              <Link to="/keep">
                <img src="../assets/img/pages/home/notes.png" alt="notes" />
                <p>Notes</p>
              </Link>
            </li>

            <li>
              <Link to="/mail">
                <img src="../assets/img/pages/home/email.png" alt="email" />
                <p>Mail</p>
              </Link>
            </li>
          </ul>
        </main>

        <footer>
          <p>Appsus is a frontend project inspired by Gmail and Google Keep. Therefore, you don’t really send an email, and we definitely not selling books.</p>
          <p>This project was made during Coding Academy full stack course, after four days of React workshop and first time exposed to Asynchronous code execution in JavaScript.</p>
          <p>Enjoy!</p>
        </footer>
      </div>
    </section>
  )
}
