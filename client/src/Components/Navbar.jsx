import React, { useState } from 'react'
import './navbar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({isLogin}) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const searchFilm = ((keyword) => {
    navigate('/search', { state: { keyword } });
  });

  const { pathname } = useLocation();
  console.log(pathname)

  const handleLogout = () => {
      localStorage.removeItem('movie-user');
      navigate('/login');
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbar__container">
        <div className="logo">
          <Link to='/' style={{textDecoration: 'none', color: 'var(--color3)'}}>WatchMovies</Link>
        </div>
        <form>
          <input type="text" placeholder='search movie...'
          onChange={(e) => searchFilm(e.target.value)}/>
        </form>
        {
          (pathname === "/")
          ?
          <div className="info">
          {isLogin === true ? 

          <Link to='/register'>
              <button type='submit' onClick={() => handleLogout()}>Logout</button>
          </Link> : 

          <>
            <Link to='/login'>
              <button type='submit' id='button__login'>Login</button>
            </Link>
            <Link to='/register'>
              <button type='submit'>Register</button>
            </Link>
          </>
          }
            
          </div>
          :
          ""
        }
      </div>
    </div>
  )

  
}

export default Navbar