import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import backArrow from "../../assets/back-arrow.svg"
import sendAlt from "../../assets/send-alt.svg"
import defaultProfile from "../../assets/profile-default.svg"

import "./main.scss"

import { getInfoUser } from '../../services/userServices'
import { getUsers } from '../../services/userServices'
import { getSession } from '../../services/storageService'

import { getIndividualPost } from '../../services/postService'
import { getIndividualPostWithMessages } from '../../services/postService'

import { postComment } from '../../services/commentService'
import { updatePost } from '../../services/postService'

const Post = () => {
  //let postId = useParams()
  let newPostId = 1;
  const { register, handleSubmit, watch, errors, reset } = useForm()

  const [showContainer, setShowContainer] = useState(false)
  const [showContainer2, setShowContainer2] = useState(false)
  const [showContainer3, setShowContainer3] = useState(false)
  const [postCommentsArray, setPostCommentsArray] = useState(false)


  //almacenadores de datos recibidos
  const [userInfo, setUserInfo] = useState({})
  const [postContent, setPostContent] = useState({})
  const [usersInfo, setUsersInfo] = useState([])
  //validadores de repeticion de proceso
  const [repeatUser, setRepeatUser] = useState(false)
  const [repeatProcess, setRepeatProcess] = useState(false)
  const [repeatProcess2, setRepeatProcess2] = useState(false)

  useEffect(() => {
    if (userInfo?.id) {
      console.log("usuario actual: ", userInfo)
    } else {
      const user = getSession()
      setUserInfo(user)
      setRepeatUser(!repeatUser)
    }
  }, [repeatUser])

  useEffect(() => {

    if (showContainer) {
      console.log("info del post: ", postContent)
      let newCommentsArray = postContent.comments.map((element) => element.id)
      setPostCommentsArray(newCommentsArray)
      console.log(postCommentsArray)
    } else {
      receivePost(newPostId)
      setRepeatProcess(!repeatProcess)
    }

  }, [repeatProcess, showContainer3])

  useEffect(() => {
    if (showContainer2) {
      console.log("info de todos: ", usersInfo)
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

  const publishCommentOnComments = async (message) => {
    let messageToSend = {
      "postId": newPostId,
      "userId": userInfo.id,
      "text": message,
      "timestamp": new Date().getTime()
    }
    const response = await postComment(messageToSend)
    console.log(response)
  }

  const publishCommentOnPost = async () => {
    let patchPost = postContent;
    postContent.comments = postCommentsArray;
    response = await updatePost(newPostId, patchPost)
    console.log(response)
  }

  const onSubmit = (newData) => {
    console.log(newData)
    if (newData.newMessage.length > 0) {
      publishCommentOnComments(newData.newMessage)
      publishCommentOnPost()
      reset()
      setShowContainer(false)
      setShowContainer3(!showContainer3)
    }

  }

  return (
    <>

      {(showContainer && showContainer2) ?
        (<main className='post__container'>
          <figure className='post__figure'>
            <img src={postContent.media} alt="imagen del post" className='post__figure__media' />
            <div className='post__figure__info' >
              <figure className='post__figure__info__owner' >
                <img src={usersInfo.map((element) => (element.id === postContent.userId) && (element.avatar))} alt="miniatura del perfil" />
              </figure>
              <p>{usersInfo.map((element) => (element.id === postContent.userId) && (element.username))}</p>
              <div className='post__figure__info__extra'>
                <figure className='home-feed__icon-container'>
                  {
                    (userInfo.likesStore).includes(postContent.id) ? (
                      <img
                        className='home-feed__icon home-feed__icon-full'
                        src="/images/heart-full.svg"
                        alt="heart icon"
                      />
                    ) : (
                      <img
                        className='home-feed__icon'
                        src="/images/heart.svg"
                        alt="heart icon"
                      />
                    )
                  }
                  <figcaption className='home-feed__icon-description'>{postContent.likes.length}</figcaption>
                </figure>

                <figure className='home-feed__icon-container'>
                  <img className='home-feed__icon' src="/images/comment.svg" alt="comment icon" />
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
                postContent.comments.map((invCom, index) => (
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