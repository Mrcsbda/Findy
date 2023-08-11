import React, { useEffect, useState } from 'react'
import "./profile.scss"
import { getUsers } from '../../services/userServices'
import { NavLink } from 'react-router-dom'

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUsers(1)
        console.log(data);
        setCurrentUser(data)
      }
      catch (error) {
        console.log(error);
        return error
      }
    }
    fetchUser()
  }, [])


  return (
    <>
      {
        currentUser ?
          <section>
            <section className='profile__portrait'>
              <figure className='profile_backButton'><img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
              <figure><img src="" alt="user_portrait" /></figure>
              <figure><img src="/images/ellipsis.svg" alt="ellipsis.svg" /></figure>
            </section>
            <section>
              <article className='profile__stats'>
                <div>10.7 M</div>
                <figure><img src="" alt="Userimg" /></figure>
                <div>108.3 M</div>
              </article>
              <div className='profile__inf'>
                <p className='profile__inf__name'>Jennie Kim</p>
                <p className='profile__inf__username'>Usuario1</p>
                <p className='profile__inf__description'>Decripcion</p>
              </div>
              <div className='profile__buttons'>
                <div className='profile__button'>Follow</div>
                <div className='profile__button'>Messages</div>
              </div>
            </section>
            <section className='profile__body'>
              <section className='profile__typepost'>
              <div className='profile__typepost_button'>
                Photos
              </div>
              <div className='profile__typepost_button'>
                Videos
              </div>
              <div className='profile__typepost_button'>
                Tag
              </div>
              </section>
              <section className='profile__post'>
                imagenes post
              </section>
            </section>

          </section>
          :
          <div>Loading user ...</div>
      }
    </>
  )
}

export default Profile