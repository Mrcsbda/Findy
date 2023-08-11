import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <main>
      <form>
        <h1>iniciar Sesión</h1>
        <section>
          <label htmlFor="username"></label>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <input id="username" type="text" />
          </div>
        </section>
        <section>
          <label htmlFor="password"></label>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            <input id="password" type="text" />
          </div>
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