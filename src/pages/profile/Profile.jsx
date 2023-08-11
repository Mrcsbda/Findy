import React, { useEffect } from 'react'
import "./profile.scss"

const Profile = () => {
  useEffect(() => {

  }, [])


  return (
    <section>
      <div className='profile__portrait'><figure>Hola</figure></div>
      <div>
        <article>
          <div>10.7 M</div>
          <figure><img src="" alt="Userimg" /></figure>
          <div>108.3 M</div>
        </article>
        <div>
          <p>Jennie Kim</p>
          <p>Usuario1</p>
          <p></p>

        </div>
      </div>
    </section>
  )
}

export default Profile