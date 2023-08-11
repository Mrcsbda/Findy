import React from 'react'
import "./header.scss"
import Carrousel from '../carrousel/Carrousel'

const Header = ({infoHeader}) => {
  return (
    <header className='header'>
        <section className='header__logo-icons-container'>
            <img className='header__logo' src="/images/logo.png" alt="logo image" />
            <figure className='header__icons-container'>
                <img className='header__icon' src="/images/heart.svg" alt="heart icon" />
                <img className='header__icon' src="/images/messages.svg" alt="messages icon" />
            </figure>
        </section>
        <Carrousel infoHeader={infoHeader}/>
    </header>
  )
}

export default Header