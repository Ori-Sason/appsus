const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <section className="app-header">
      <header className="main-layout">
        <img className='logo' src="../assets/img/logo.png" alt="" />
        <nav>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/keep">Keep</NavLink>
          <NavLink to="/mail">Mail</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
    </section>
  )
}
