import React from 'react'
import Header from '../../components/header/Header'
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