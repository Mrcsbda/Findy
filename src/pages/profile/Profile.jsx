import React, { useContext, useEffect, useState } from 'react'
import "./profile.scss"
import { getInfoUser, patchInfoUser } from '../../services/userServices'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getPosts } from '../../services/postService'
import { AppContext } from "../../router/Router";
import Swal from 'sweetalert2'
import PostsProfile from '../../components/media/media'
import { getSession, saveSession } from '../../services/storageService'



const Profile = () => {
  const [currentUser, setCurrentUser] = useState(false)
  const [userSession, setUserSession] = useState(getSession())
  const params = useParams()
  const idUser = params.idProfile
  const [follow, setFollow] = useState(userSession.following.includes(Number(idUser)) ? true : false)
  const [followers, setFollowers] = useState([])
  const [posts, setPosts] = useState(false)
  const [optionMenu, setOptionMenu] = useState(false)
  const [staticState, setStaticState] = useState(false)
  const navigate = useNavigate()
  const { user: { userDispatch } } = useContext(AppContext)
  const [typeMedia, setMediaType] = useState("photos")

  const isUserSession = userSession.id == idUser ? true : false;

  const returnFeed = () => {
    navigate(`/`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getInfoUser(idUser)
        const post = await getPosts(idUser)
        setCurrentUser(data)
        setPosts(post)
        setFollowers(data.followers)
      }
      catch (error) {
        console.log(error);
        return error
      }
    }
    fetchUser()
  }, [follow, staticState, params])

  // LOGOUT
  const handleLogout = () => {
    userDispatch({ type: 'Logout' });
    localStorage.clear();
    navigate(`/login`)
  };
  const logout = () => {
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout()
      }
    })
  }

  const handleTypePost = (type) => {
    switch (type) {
      case "photos":
        setMediaType("photos");
        break;
      case "videos":
        setMediaType("videos");
        break;
      case "tag":
        setMediaType("tag");
        break;
    }
  }

  const handleOptionMenu = () => {
    setOptionMenu(!optionMenu)
  }

  const patchFollowers = async (idUser, idProfile) => {
    const newCurrentUser = { ...currentUser, followers: [...currentUser.followers, idUser] }
    const newUserSession = { ...userSession, following: [...userSession.following, idProfile] }
    await patchInfoUser(idUser, newUserSession)
    await patchInfoUser(idProfile, newCurrentUser)
    const user = await getInfoUser(idUser)
    const cUser = await getInfoUser(idProfile)
    saveSession(user.data)
    setUserSession(user.data)
    setCurrentUser(cUser.data)
    setFollowers(cUser.data.followers)
  }

  const patchUnfollows = async (idUser, idProfile) => {
    const newCurrentUser = { ...currentUser, followers: currentUser.followers.filter(id => id !== idUser) }
    const newUserSession = { ...userSession, following: userSession.following.filter(id => id !== idProfile) };
    await patchInfoUser(idUser, newUserSession)
    await patchInfoUser(idProfile, newCurrentUser)
    const user = await getInfoUser(idUser)
    const cUser = await getInfoUser(idProfile)
    saveSession(user.data)
    setUserSession(user.data)
    setCurrentUser(cUser.data)
    setFollowers(cUser.data.followers)
  }

  const handleFollow = () => {
    setFollow(!follow)

  }

  useEffect(() => {


    if (currentUser) {
      if (follow) {
        if (!(currentUser.followers.includes(userSession.id)) && !(userSession.following.includes(currentUser.id))) {
          console.log('hola');
          setFollowers(prevFollowers => [...prevFollowers, Number(idUser)])
          patchFollowers(Number(userSession.id), Number(idUser))
        }
      } else {
        if ((currentUser.followers.includes(userSession.id)) && (userSession.following.includes(currentUser.id))) {
          setFollowers(prevFollowers => prevFollowers.filter(id => id !== Number(idUser)));
          patchUnfollows(Number(userSession.id), Number(idUser))
        }
      }
    }

  }, [follow, params])

  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Profile Editor',
      confirmButtonText: 'Edit',
      showCancelButton: true,
      html:
        ` <span class="editor__span">Edit username </span>
    <input id="swal-input1" class="swal2-input editor__input" type="text" value=${userSession.username}>` +
        ` <span class="editor__span">Edit Avatar </span>
    <input id="swal-input2" class="swal2-input  editor__input" type="url" value=${userSession.avatar}>` +
        ` <span class="editor__span">Edit Banner </span>
    <input id="swal-input3" class="swal2-input editor__input" type="url" value=${userSession.portrait}>` +
        ` <span class="editor__span">Edit Name </span>
    <textarea id="swal-input4" class="swal2-input editor__input editor__textarea">${userSession.name}</textarea>`
        + ` <span class="editor__span">Edit Description </span>
    <textarea id="swal-input5" class="swal2-input editor__input editor__textarea">${userSession.description}</textarea>`
      ,
      focusConfirm: false,
      preConfirm: () => {
        return {
          ...userSession,
          "username": document.getElementById('swal-input1').value,
          "avatar": document.getElementById('swal-input2').value,
          "portrait": document.getElementById('swal-input3').value,
          "name": document.getElementById('swal-input4').value,
          "description": document.getElementById('swal-input5').value
        }
      }
    })

    if (formValues) {
      await patchInfoUser(userSession.id, formValues)
      saveSession(formValues)
      setStaticState(!staticState)
      setUserSession(formValues)
    }
  }



  return (
    <>
      {

        currentUser ?

          <section className='profile'>
            <section className='profile__portrait'>
              <figure className='profile__portrait__backButton' onClick={returnFeed}><img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
              <figure className='profile__portrait__picture'><img src={currentUser.portrait} alt="user_portrait" /></figure>
              {isUserSession &&
                <figure className='profile__portrait__optionButton' onClick={handleOptionMenu}><img src="/images/ellipsis.svg" alt="ellipsis.svg" /></figure>
              }
              {
                optionMenu &&
                <ul className='profile__editor'>
                  <li className='profile__editor__item' onClick={handleEdit}>Edit profile</li>
                  <li className='profile__editor__item' onClick={logout}>LogOut</li>
                </ul>
              }
            </section>
            <section className='profile__header'>
              <article className='profile__stats'>
                <div className='profile__stats__container profile__stats__followers'> <span className='profile__stats__number'>{currentUser.followers.length}</span>
                  <span>Followers</span>
                </div>
                <figure><img src={currentUser.avatar} alt="Userimg" /></figure>
                <div className='profile__stats__container profile__stats__likes'><span className='profile__stats__number'>{currentUser.following.length}</span>
                  <span>Likes</span>
                </div>
              </article>
              <div className='profile__inf'>
                <p className='profile__inf__name'>{currentUser.name}</p>
                <p className='profile__inf__username'>{currentUser.username}</p>
                <p className='profile__inf__description'>{currentUser.description}</p>
              </div>

              {
                !isUserSession &&
                <div className='profile__buttons'>

                  {follow ?
                    <div className='profile__button' onClick={() => handleFollow()}>Followed</div>
                    :
                    <div className='profile__button' onClick={() => handleFollow()}>Follow</div>}
                  <div className='profile__button'>Messages</div>
                </div>}
            </section>
            <section className='profile__body'>
              <section className='profile__typepost'>
                <div className={`profile__typepost__button ${typeMedia == "photos" && "profile__typepost__actived"}`} onClick={() => handleTypePost("photos")}>
                  Photos
                </div>
                <div className={`profile__typepost__button ${typeMedia == "videos" && "profile__typepost__actived"}`} onClick={() => handleTypePost("videos")}>
                  Videos
                </div>
                <div className={`profile__typepost__button ${typeMedia == "tag" && "profile__typepost__actived"}`} onClick={() => handleTypePost("tag")}>
                  Tag
                </div>
              </section>

              {
                posts.length ?

                  <PostsProfile posts={posts} typeMedia={typeMedia} idUser={idUser} />
                  :
                  <div><p>El usuario no tiene publicaciones ...</p></div>
              }

            </section>

          </section>
          :
          <div>Loading user ...</div>
      }
    </>
  )
}

export default Profile