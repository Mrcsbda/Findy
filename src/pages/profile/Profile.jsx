import React, { useEffect } from 'react'
import "./profile.scss"

const Profile = () => {
  useEffect(() => {

  }, [])


  return (
    <section>
      <section className='profile__portrait'>
        <figure className='profile_backButton'><img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
        <figure><img src="" alt="user_portrait"/></figure>
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

    </section>
  )
}

export default Profile