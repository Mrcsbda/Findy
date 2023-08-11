import React from 'react'
import "./header.scss"

const Header = () => {
  return (
    <header className='header'>
        <section className='header__logo-icons-container'>
            <img className='header__logo' src="/images/logo.png" alt="logo image" />
            <figure className='header__icons-container'>
                <img className='header__icon' src="/images/heart.svg" alt="heart icon" />
                <img className='header__icon' src="/images/messages.svg" alt="messages icon" />
            </figure>
        </section>
    </header>
  )
}

export default Header