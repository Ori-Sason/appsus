import { AppHeader } from './cmps/app-header.jsx'
import { About } from './pages/app-about.jsx'
import { Home } from './pages/app-home.jsx'
import { BookApp } from './apps/book/pages/book-index.jsx'
import { BookDetails } from './apps/book/pages/book-details.jsx'
import { KeepApp } from './apps/keep/pages/keep-index.jsx'
import { MailApp } from './apps/mail/pages/mail-index.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <section className='body-container'>
        <AppHeader />
        <section className="app">
          <Switch>
            <Route path="/book/:bookId" component={BookDetails} />
            <Route path="/book" component={BookApp} />
            <Route path="/keep" component={KeepApp} />
            <Route path="/mail" component={MailApp} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </section>
        <footer className='main-footer main-layout'>
          <p>☕ Coffeerights 2022 Ori Sason, nothing reserved</p>
        </footer>
      </section>
      <UserMsg />
    </Router>
  )
}
