import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router'
import Profile from './pages/profile/Profile'

ReactDOM.createRoot(document.getElementById('root')).render(<Profile idUser={1}/>)
