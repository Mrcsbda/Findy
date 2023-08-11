import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <main className='login'>
      <form className='login__form'>
        <h1>Iniciar Sesión</h1>
        <section>
          <label htmlFor="username">Usuario</label>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <input id="username" type="text" />
          </div>
          <hr />
        </section>
        <section>
          <label htmlFor="password">Contraseña</label>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <input id="password" type="text" />
          </div>
          <hr />
        </section>
        <button>Iniciar Sesión</button>
      </form>
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
    </main>
  )
}

export default Login