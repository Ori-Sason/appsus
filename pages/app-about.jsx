export function About() {
  return (
    <section className="about main-layout">
      <div className="logo-container">
        <img className='logo' src="../assets/img/logo.png" alt="" />
      </div>
      <main>
        <h1>About us</h1>
        <section className="members">

          <article className="alex">
            <header>
              <img src="../assets/img/pages/about/alex-yakovlev.jpg" alt="Alex Yakovlev" />
              <h2>Alex Yakovlev</h2>
            </header>
            <main>
              <p>Hi, I am 25 y.o. Just finished 7 year in the Israeli air force, I have been at the air force in a variety of roles.</p>
              <p>Currently studying to become a full stack developer at Coding academy.</p>
            </main>
            <div className="links">
              <a className="fa fa-facebook" href="https://www.facebook.com/AlexKibab"></a>
              <a className="fa fa-linkedin" href="https://www.linkedin.com/in/%D7%90%D7%9C%D7%9B%D7%A1-%D7%99%D7%A2%D7%A7%D7%95%D7%91%D7%9C%D7%91-27a592236/"></a>
              <a className="fa fa-instagram" href="https://www.instagram.com/yakovlev.alex1/"></a>
            </div>
          </article>

          <article className="ori">
            <header>
              <img src="../assets/img/pages/about/ori-sason.jpg" alt="Ori Sason" />
              <h2>Ori Sason</h2>
            </header>
            <main>
              <p>Started as a CPA in an audit department in PwC Israel and continued to a full-time job as a developer of automated tools for the different departments in the firm.</p>
              <p>Currently studying full stack development at Coding Academy.</p>
            </main>
            <div className="links">
              <a className="fa fa-facebook" href="https://www.facebook.com/ori.sason/"></a>
              <a className="fa fa-linkedin" href="https://www.linkedin.com/in/ori-sason-cpa-318062229/"></a>
            </div>
          </article>

        </section>
      </main>
    </section>
  )
}
