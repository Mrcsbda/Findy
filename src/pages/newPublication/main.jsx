import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "./main.scss"
import backArrow from "../../assets/back-arrow.svg"
import { useNavigate, Link } from 'react-router-dom'
import { postPost } from '../../services/postService'
import { getSession } from '../../services/storageService'
import Swal from 'sweetalert2'

const NewPublication = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const watchFields = watch(["pubType", "pubText", "pubTags"])
  const navigate = useNavigate()
  const [publicationType, setPublicationType] = useState("")
  const imageFormat = ["png", "img", "jpg", "jpeg"]
  const videoFormat = ["mp4", "avi", "flv"]
  const [userInfo, setUserInfo] = useState(false)

  //validadores
  const [repeatUser, setRepeatUser] = useState(false)
  const [showContainer, setShowContainer] = useState(false)
  const [postStatus, setPostStatus] = useState(false)

  let samplePost = {
    userId: 1,
    image: "",
    caption: "",
    likes: [],
    comments: [],
    tag: [],
    type: "",
    time: 666
  }

  //verificacion de usuario
  useEffect(() => {
    const user = getSession()
    setUserInfo(user)
    //console.log(userInfo)
    if (userInfo == false) {
      setRepeatUser(!repeatUser)
    }
  }, [repeatUser])

  //verificacion del formulario
  useEffect(() => {
    //console.log(watchFields)
    let formContent = watchFields[0]
    //console.log(formContent)
    if ((formContent) && (formContent.includes("https:"))) {
      if ((formContent.includes("png")) || (formContent.includes("img")) || (formContent.includes("jpg")) || (formContent.includes("jpeg")) || (formContent.includes("image")) || (formContent.includes("img"))) {
        setPublicationType("photo")
        setShowContainer(true)
      } else if ((formContent.includes("mp4")) || (formContent.includes("avi")) || (formContent.includes("flv"))) {
        setPublicationType("video")
        setShowContainer(true)
      } else {
        setPublicationType("no-identified")
        setShowContainer(false)
      }
      //console.log("tipo", publicationType)
      //console.log("estado de share: ", showContainer)
    } else {
      setShowContainer(false)
    }
  }, [watchFields])


  const onSubmit = (data) => {
    //console.log(data)
    //no se usa porque el boton estab aparte
  }
  //ejecutar al click en compartir
  const onShare = () => {
    samplePost.userId = userInfo.id
    samplePost.image = watchFields[0];
    samplePost.caption = watchFields[1];
    let parts = watchFields[2].split(" ");
    samplePost.tag = parts;
    samplePost.type = publicationType;
    samplePost.time = new Date().getTime()
    //console.log(samplePost)

    postToServer(samplePost)
    if (postStatus === true) {
      Swal.fire(
        `Se ha publicado con exito`,
        '',
        'success'
      ).then(() => {
        navigate(-1)
      })
    } else {
      Swal.fire(
        'Ooopss!',
        'Hubo un error en la publicacion!',
        'error'
      )
    }
  }

  //peticion asincrona tipo post al servidor
  const postToServer = async (obj) => {
    let status = await postPost(obj)
    //console.log(status)
    if (status === 201) {
      setPostStatus(true)
    } else {
      setPostStatus(false)
    }
  }



  return (


    <main className='publication__container'>
      <header className='header'>
        <figure>
          <Link to="/">
            <img src={backArrow} alt="flecha de atras" />
          </Link>
        </figure>
        <h2>Nueva publicacion</h2>
        {showContainer ? <p className='header__share__activated' onClick={onShare} >Compartir</p> : <p className='header__share'>Compartir</p>}
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='form' >
        <div className='form__box'>
          <label htmlFor="pubType">Agregar contenido</label>
          <input className='form__box__input' type="url" placeholder='enlace de la imagen o video' {...register("pubType")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubText">Agregar descripcion</label>
          <input className='form__box__input' type="text" placeholder='Escribe un pie de foto o video...' {...register("pubText")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubTags">Etiquetar personas</label>
          <input className='form__box__input' type="text" placeholder='Etiqueta a tus amigos :D' {...register("pubTags")} />
        </div>

      </form>
    </main >


  )
}

export default NewPublication