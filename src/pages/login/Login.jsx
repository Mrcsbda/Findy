import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <main className='login'>
      <form className='login__form'>
        <h1 className='login__title'>Iniciar Sesión</h1>
        <section className='login__container'>
          <label className='login__label' htmlFor="username">Usuario</label>
          <div className='login__input-container'>
            <figure className='login__icon-form-container'>
              <img className='login__icon-form' src="/images/user.svg" alt="user icon" />
            </figure>
            <input className='login__input' id="username" type="text" placeholder='Digita tu usuario'/>
          </div>
          <hr />
        </section>
        <section className='login__container'>
          <label className='login__label' htmlFor="password">Contraseña</label>
          <div className='login__input-container'>
            <figure className='login__icon-form-container'>
              <img className='login__icon-form' src="/images/padlock.svg" alt="padlock icon" />
            </figure>
            <input className='login__input' id="password" type="text" placeholder='Digita tu contraseña'/>
          </div>
          <hr />
        </section>
        <button className='login__btn-submit'>Iniciar Sesión</button>
        <div className='login__separated-container'>
          <hr />
          <p>0</p>
          <hr />
        </div>
        <figure className='login__networks-container'>
          <img className='login__network-icon' src="/images/facebook.svg" alt="facebook icon" />
          <img className='login__network-icon' src="/images/gmail.svg" alt="gmail icon" />
          <img className='login__network-icon' src="/images/twitter.svg" alt="twitter icon" />
        </figure>

      </form>

    </main>
  )
}

export default Login