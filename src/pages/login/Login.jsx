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
        <button>Iniciar Sesión</button>
        <div>
          <hr />
          <p>Puedes iniciar sesión usando</p>
          <hr />
        </div>
        <figure>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </figure>
        <figure>
          <img src="" alt="" />
        </figure>
      </form>

    </main>
  )
}

export default Login