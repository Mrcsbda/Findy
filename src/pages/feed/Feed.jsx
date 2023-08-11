import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { getSession } from '../../services/storageService'
import { getUsers } from '../../services/userServices'
import "./feed.scss"

const Feed = () => {

  const [users, setUsers] = useState([])
  const [infoHeader, setInfoHeader] = useState([])

  useEffect(() => {
    getDate()
  }, [])

  const getDate = async () => {
    const data = await getUsers()
    setUsers(data)
    getInfoHeader(data)
  }

  const getInfoHeader = (users) => {
    const userLogged = getSession()
    const usersInfo = [
      {
        avatar: userLogged.avatar,
        name: "Tu historia"
      }
    ]

    users.forEach(user => {
      if (user.id !== userLogged.id) {
        usersInfo.push({
          avatar: user.avatar,
          name: user.name,
        })
      }
    })

    setInfoHeader(usersInfo)
  }

  return (
    <main className='feed'>
      <Header infoHeader={infoHeader}/>
    </main>
  )
}

export default Feed