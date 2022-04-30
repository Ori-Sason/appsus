const { Link, NavLink } = ReactRouterDOM

export class AppHeader extends React.Component {

  state={
    isMenu:false
  }

  toggleMenu=()=>{
  const {isMenu} =this.state
  this.setState({isMenu:!isMenu})
  }

  render(){
    const {isMenu} =this.state

    return (
      <section className="app-header">
      <header className="main-layout">
        <Link to="/">
        <img className='logo' src="assets/img/logo.png" alt="" />
        </Link>
        <nav onClick={this.toggleMenu} className={`header-nav-links-btn ${isMenu?'active':''}`}>
          {isMenu&&<div className="header-menu-links">
            
          <NavLink className='nav-home' to="/" exact><span className="nav-home-span">Home</span></NavLink>
          <NavLink className='nav-keep' to="/keep"><span className="nav-keep-span">Keep</span></NavLink>
          <NavLink className='nav-mail'to="/mail"><span className="nav-mail-span">Mail</span></NavLink>
          <NavLink className='nav-book' to="/book"><span className="nav-book-span">Books</span></NavLink>
          <NavLink className='nav-about'to="/about"><span className="nav-about-span">About</span></NavLink>
          </div>}
         {isMenu&&<div onClick={this.toggleMenu} className="background-screen-back"></div>}
        </nav>
      </header>
    </section>
  )
}
}

