import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import Login from '../pages/login/Login'
import Feed from '../pages/feed/Feed'
import Profile from '../pages/profile/Profile'
import Post from '../pages/post/Post'
import { initialUser, userReducer } from '../reducer/userReducer'
import Layout from '../pages/layout/Layout'
import NewPublication from '../pages/newPublication/main.jsx'

export const AppContext = createContext({})

const Router = () => {
  const [userLogin, userDispatch] = useReducer(userReducer, initialUser)
  const globalState = {
    user: {
      userLogin,
      userDispatch
    }
  }

  return (
    <AppContext.Provider value={globalState}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route element={<PublicRouter isAuthenticated={userLogin.isAuthenticated} />}>
              <Route path='login' element={<Login />} />
            </Route>
            <Route element={<PrivateRouter isAuthenticated={userLogin.isAuthenticated} />}>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<Feed />} />
                <Route path=':idProfile/'>
                  <Route index element={<Profile />} />
                  <Route path=':idPost' element={<Post />} />
                </Route>
                <Route path='newPub' element={<NewPublication />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default Router