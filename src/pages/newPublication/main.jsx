import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "./main.scss"
import backArrow from "../../assets/back-arrow.svg"
import { useNavigate, Link } from 'react-router-dom'
import { postPost } from '../../services/postService'
import { getSession } from '../../services/storageService'
import Swal from 'sweetalert2'
import { getUsers } from '../../services/userServices'

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

  //datos de todos los usuarios para el tag
  const [repeatProcess2, setRepeatProcess2] = useState(false)
  const [showContainer2, setShowContainer2] = useState(false)
  const [usersInfo, setUsersInfo] = useState(false)

  let samplePost = {
    userId: 1,
    media: "",
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
      if ((formContent.includes("png")) || (formContent.includes("Png")) || (formContent.includes("img")) || (formContent.includes("Img")) || (formContent.includes("jpg")) || (formContent.includes("Jpg")) || (formContent.includes("jpeg")) || (formContent.includes("Jpeg")) || (formContent.includes("image")) || (formContent.includes("Image")) || (formContent.includes("img")) || (formContent.includes("Img"))) {
        setPublicationType("photo")
        setShowContainer(true)
      } else if ((formContent.includes("mp4")) || (formContent.includes("avi")) || (formContent.includes("flv")) || (formContent.includes("youtube"))) {
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


  useEffect(() => {
    if (showContainer2) {
      //console.log("info de todos: ", usersInfo)
    } else {
      receiveUsers()
      setRepeatProcess2(!repeatProcess2)
    }
  }, [repeatProcess2])


  const receiveUsers = async (ownerId) => {
    let infoUsers = await getUsers()
    if (infoUsers.length > 0) {
      //console.log(infoUser.status)
      setUsersInfo(infoUsers)
      setShowContainer2(true)
    } else {
      setShowContainer2(false)
    }
  }


  const onSubmit = (data) => {
    //console.log(data)
    //no se usa porque el boton estab aparte
  }
  //ejecutar al click en compartir
  const onShare = async () => {
    samplePost.userId = userInfo.id
    samplePost.media = watchFields[0];
    samplePost.caption = watchFields[1];
    samplePost.type = publicationType;
    samplePost.time = new Date().getTime()

    let tageados = watchFields[2].split(" ");
    let usuarios = usersInfo
    let parts2 = []
    //let parts2 = parts.map((element) => usersInfo.map((element2) => (element == element2.username) && (element2.id)))
    tageados.forEach(element => {
      usuarios.forEach(element2 => {
        if ((element === element2.username)) {
          parts2.push(element2.id)
        }
      })
    });
    samplePost.tag = parts2;
    //console.log(samplePost)

    await postToServer(samplePost)
  }

  //peticion asincrona tipo post al servidor
  const postToServer = async (obj) => {
    let status = await postPost(obj)
    console.log("estatus del post ", status)
    if (status === 201) {
      setPostStatus(true)
      Swal.fire(
        `Se ha publicado con exito`,
        '',
        'success'
      ).then(() => {
        navigate(-1)
      })
    } else {
      setPostStatus(false)
      Swal.fire(
        'Ooopss!',
        'Hubo un error en la publicacion!',
        'error'
      )
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
          <input className='form__box__input' type="url" placeholder='Enlace de la imagen o video' {...register("pubType")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubText">Agregar descripcion</label>
          <input className='form__box__input' type="text" placeholder='Escribe un pie de foto o video...' {...register("pubText")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubTags">Etiquetar personas</label>
          <input className='form__box__input' type="text" placeholder='Etiqueta a tus amigos por su username' {...register("pubTags")} />
        </div>
      </form>
    </main >
  )
}

export default NewPublication