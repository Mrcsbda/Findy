import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { getSession } from '../../services/storageService'
import { getUsers } from '../../services/userServices'
import "./feed.scss"
import HomeFeed from '../../components/homeFeed/HomeFeed'

const Feed = () => {
  return (
    <main className='feed'>
      <Header />
      <HomeFeed />
    </main>
  )
}

export default Feed