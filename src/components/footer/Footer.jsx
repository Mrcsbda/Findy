import React, { useEffect, useState } from 'react'
import "./footer.scss"
import { Link } from 'react-router-dom';
import { getSession } from '../../services/storageService';

const Footer = () => {
  const [user, setUser] = useState({})
  useEffect(()=> {
    const userLogged = getSession()
    setUser(userLogged)
  },[])

  return (
    <footer className='footer'>
      <section className='footer__left-side-container'>
        <Link>
          <img src="/images/home.svg" alt="home icon" className='footer__icon' />
        </Link>
        <img src="/images/search.svg" alt="" className='footer__icon' />
      </section>
      <section className='footer__center-container'>
        <figure className='footer__icon-container'>
          <img src="/images/plus.svg" alt="" className='footer__plus-icon' />
        </figure>
      </section>
      <section className='footer__right-side-container'>
        <img src="/images/bell.svg" alt="" className='footer__icon'/>
        <Link>
          <img src={user.avatar} alt="" className='footer__user-icon' />
        </Link>
      </section>
      <div className='footer__background'>
      </div>
    </footer>
  )
}

export default Footer;