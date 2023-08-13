import React, { useContext } from 'react'
import "./login.scss"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { saveSession } from '../../services/storageService'
import { AppContext } from '../../router/Router'
import { getUser } from '../../services/userServices'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { user: { userDispatch } } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const dataUser = await getUser(data.email, data.password)

      if (dataUser) {
        Swal.fire(
          `Bienvenido! ${dataUser.name}`,
          '',
          'success'
        ).then(() => {
          userDispatch({
            type: "login",
            payload: {
              isAuthenticated: true,
              user: dataUser
            }
          })
          navigate("/")
          saveSession(dataUser)
        })
      } else {
        Swal.fire(
          'Ooopss!',
          'Información incorrecta!',
          'error'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='login'>
      <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='login__title'>Iniciar Sesión</h1>
        <section className='login__container'>
          <label className='login__label' htmlFor="email">Correo</label>
          <div className='login__input-container'>
            <figure className='login__icon-form-container'>
              <img className='login__icon-form' src="/images/user.svg" alt="user icon" />
            </figure>
            <input
              className='login__input'
              id="email"
              type="email"
              placeholder='Digita tu correo'
              {...register("email", { required: true })} />
          </div>
          <hr />
        </section>
        <section className='login__container'>
          <label className='login__label' htmlFor="password">Contraseña</label>
          <div className='login__input-container'>
            <figure className='login__icon-form-container'>
              <img className='login__icon-form' src="/images/padlock.svg" alt="padlock icon" />
            </figure>
            <input
              className='login__input'
              id="password"
              type="password"
              placeholder='Digita tu contraseña'
              {...register("password", { required: true })} />
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