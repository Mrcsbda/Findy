import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "./main.scss"
import backArrow from "../../assets/back-arrow.svg"
import { useNavigate } from 'react-router-dom'
import { postPost } from '../../services/postService'
import { getSession } from '../../services/storageService'

const NewPublication = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const watchFields = watch(["pubType", "pubText", "pubTags"])
  const [showContainer, setShowContainer] = useState(false)
  const navigate = useNavigate()
  const [publicationType, setPublicationType] = useState("")
  const imageFormat = ["png", "img", "jpg", "jpeg"]
  const videoFormat = ["mp4", "avi", "flv"]
  const [userInfo, setUserInfo] = useState(false)

  let samplePost = {
    userId: 99,
    image: "",
    caption: "",
    likes: [],
    comments: [],
    tag: [],
    type: "",
    time: 1691798400000
  }

  //verificacion de usuario
  useEffect(() => {
    const user = getSession()
    setUserInfo(user)
    console.log(userInfo)
  }, [])

  //verificacion del formulario
  useEffect(() => {
    //console.log(watchFields)
    let formContent = watchFields[0]
    console.log(formContent)
    if ((formContent) && (formContent.includes("https:"))) {
      if ((formContent.includes("png")) || (formContent.includes("img")) || (formContent.includes("jpg")) || (formContent.includes("jpeg"))) {
        setPublicationType("photo")
        setShowContainer(true)
      } else if ((formContent.includes("mp4")) || (formContent.includes("avi")) || (formContent.includes("flv"))) {
        setPublicationType("video")
        setShowContainer(true)
      } else {
        setPublicationType("no-identified")
        setShowContainer(false)
      }
      console.log("tipo", publicationType)
      console.log("estado de share: ", showContainer)
    } else {
      setShowContainer(false)
    }
  }, [watchFields])


  const onSubmit = (data) => {
    //console.log(data)
    //no se usa porque el boton estab aparte
  }

  const onShare = () => {
    samplePost.image = watchFields[0];
    samplePost.caption = watchFields[1];
    let parts = watchFields[2].split(" ");
    samplePost.tag = parts;
    samplePost.type = publicationType;
    console.log(samplePost)
  }

  const postToServer = async (obj) => {
    let status = await postPost(obj)
    console.log(status)
    //if (status === 201)

  }
  return (


    <main className='publication__container'>
      <header className='header'>
        <figure>
          <img src={backArrow} alt="flecha de atras" />
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
    </main>


  )
}

export default NewPublication