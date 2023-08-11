import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { getSession } from '../../services/storageService'
import { getUsers } from '../../services/userServices'

const Feed = () => {

  const [users, setUsers] = useState()
  const [infoHeader, setInfoHeader] = useState()

  useEffect(() => {
    getDate()
  }, [])

  const getDate = async () => {
    const data = await getUsers()
    console.log(data)
  }

  const getInfoHeader = (users) => {
    const userLogged = getSession()
  }

  return (
    <main>
      <Header />
    </main>
  )
}

export default Feed