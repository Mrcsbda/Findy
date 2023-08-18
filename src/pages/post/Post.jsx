import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import sendAlt from "../../assets/send-alt.svg"


import "./main.scss"

import { getUsers } from '../../services/userServices'
import { getSession } from '../../services/storageService'


import { getIndividualPostWithMessages } from '../../services/postService'

import { postComment } from '../../services/commentService'
import { updatePost } from '../../services/postService'
import { updateUser } from '../../services/userServices'
import { saveSession } from '../../services/storageService'

const Post = () => {
  let postId = useParams()
  let newPostId = Number(postId.idPost);
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const [showContainer, setShowContainer] = useState(false)
  const [showContainer2, setShowContainer2] = useState(false)
  const [showContainer3, setShowContainer3] = useState(false)
  const [postCommentsArray, setPostCommentsArray] = useState(false)
  const [idToSend, setIdToSend] = useState(false)


  //almacenadores de datos recibidos
  const [userInfo, setUserInfo] = useState({})
  const [postContent, setPostContent] = useState({})
  const [usersInfo, setUsersInfo] = useState([])
  //validadores de repeticion de proceso
  const [repeatUser, setRepeatUser] = useState(false)
  const [repeatProcess, setRepeatProcess] = useState(false)
  const [repeatProcess2, setRepeatProcess2] = useState(false)

  useEffect(() => {
    //console.log(newPostId)
    if (userInfo?.id) {
      //console.log("usuario actual: ", userInfo)
    } else {
      const user = getSession()
      setUserInfo(user)
      setRepeatUser(!repeatUser)
    }
  }, [repeatUser])

  useEffect(() => {

    if (showContainer) {
      console.log("info del post: ", postContent)
      let newCommentsArray = ((postContent.comments).map((element) => element.id)) || []
      setPostCommentsArray(newCommentsArray)
      console.log(postCommentsArray)
    } else {
      receivePost(newPostId)
      setRepeatProcess(!repeatProcess)
    }

  }, [repeatProcess, showContainer3])

  useEffect(() => {
    if (showContainer2) {
      //console.log("info de todos: ", usersInfo)
    } else {
      receiveUsers()
      setRepeatProcess2(!repeatProcess2)
    }
  }, [repeatProcess2])


  const receivePost = async (idtoSearch) => {
    //let server = await getIndividualPost(idtoSearch)
    let server = await getIndividualPostWithMessages(idtoSearch)
    //console.log(server)
    if (server.status === 200) {
      //console.log(server.status)
      setPostContent(server.data)
      setShowContainer(true)
    } else {
      setShowContainer(false)
    }
  }

  const receiveUsers = async () => {
    let infoUsers = await getUsers()
    if (infoUsers.length > 0) {
      //console.log(infoUser.status)
      setUsersInfo(infoUsers)
      setShowContainer2(true)
    } else {
      setShowContainer2(false)
    }
  }

  const publishCommentOnComments = async (message) => {
    let messageToSend = {
      "postId": newPostId,
      "userId": userInfo.id,
      "text": message,
      "timestamp": new Date().getTime()
    }
    const response = await postComment(messageToSend)
    console.log(response)
    setIdToSend(response.data.id)
  }

  const publishCommentOnPost = async () => {
    let patchPost = postContent;
    let appendPost = postCommentsArray.push(idToSend);

    patchPost.comments = appendPost;
    const response = await updatePost(newPostId, patchPost)
    console.log(idToSend)
    console.log(response)
  }

  const onSubmit = async (newData) => {
    console.log(newData)
    if (newData.newMessage.length > 0) {
      await publishCommentOnComments(newData.newMessage)
      await publishCommentOnPost()
      reset()
      setShowContainer(false)
      setShowContainer3(!showContainer3)

    }

  }

  const handleLike = async () => {
    let postLikes = [...postContent.likes];
    let likesStore = [...userInfo.likesStore]

    if (userInfo.likesStore.includes(newPostId)) {
      const findIndexInPost = postLikes.filter((postElement) => postElement !== userInfo.id)
      postLikes = findIndexInPost;
      const findIndexInUser = likesStore.filter((userElement) => userElement !== newPostId)
      likesStore = findIndexInUser
    } else {
      postLikes.push(userInfo.id)
      likesStore.push(newPostId)
    }

    const propertyNamePost = {
      likes: postLikes
    }

    const propertyNameUser = {
      likesStore,
    }

    await updatePost(newPostId, propertyNamePost)
    await updateUser(userInfo, propertyNameUser)
    saveSession({
      ...userInfo,
      likesStore,
    })

    setUserInfo({})
    setRepeatUser(!repeatUser)
    setShowContainer(false)
    setShowContainer3(!showContainer3)
  }

  const onBackPage = () => {
    navigate(-1)
  }

  return (
    <>

      {(showContainer && showContainer2) ?
        (<main className='post__container'>
          <figure className='post__figure'>
            <img src={postContent.media} alt="imagen del post" className='post__figure__media' />
            <figure className='post__figure__back' onClick={onBackPage}>
              <img src='/images/arrow-left.svg' alt="" />
            </figure>
            <div className='post__figure__info' >
              <figure className='post__figure__info__owner' >
                {usersInfo.map((element, index) => (element.id === postContent.userId) && (<img key={index} src={element.avatar} alt="miniatura del perfil" />))}
              </figure>
              <p>{usersInfo.map((element) => (element.id === postContent.userId) && (element.username))}</p>
              <div className='post__figure__info__extra'>
                <figure className='home-feed__icon-container' onClick={handleLike} >
                  {
                    (userInfo.likesStore).includes(postContent.id) ? (
                      <img
                        className='post__icon home-feed__icon-full'
                        src="/images/heart-full.svg"
                        alt="heart icon"
                      />
                    ) : (
                      <img
                        className='post__icon'
                        src="/images/heart.svg"
                        alt="heart icon"
                      />
                    )
                  }
                  <figcaption className='home-feed__icon-description'>{postContent.likes.length}</figcaption>
                </figure>

                <figure className='home-feed__icon-container'>
                  <img className='post__icon' src="/images/comment.svg" alt="comment icon" />
                  <figcaption className='home-feed__icon-description'>{postContent.comments.length}</figcaption>
                </figure>
              </div>
            </div>
          </figure>

          <section className='post__description'>
            <p>{postContent.caption}</p>
            <article className='post__description__write'>
              <figure className='post__description__write__pretext'>
                <img src={userInfo.avatar} alt="avatar de perfil" />
              </figure>
              <form onSubmit={handleSubmit(onSubmit)} className='post__description__write__form'>
                <input type="text" placeholder='Write comment as username' {...register("newMessage")} />
                <button type="submit"> <img src={sendAlt} alt="prueba boton" /> </button>
              </form>
            </article>

            <article className='post__description__comments'>
              {
                (postContent.comments).map((invCom, index) => (
                  <div key={index} className='comments__box'>
                    <figure className='comments__box__figure'>
                      {usersInfo.map((indUser, index2) => (indUser.id === invCom.userId) && (
                        <img key={index2} src={indUser.avatar} alt="avatar de usuario" />
                      ))}
                    </figure>
                    <div className='comments__box__description'>
                      <p className='description__user'>{usersInfo.map((indUser) => (indUser.id === invCom.userId) && (indUser.username))}</p>
                      <p className='description__text'>{invCom.text}</p>
                    </div>
                  </div>
                ))
              }
            </article>

          </section>
        </main>)
        : (<p> ...Cargando</p>)

      }
    </>
  )
}

export default Post