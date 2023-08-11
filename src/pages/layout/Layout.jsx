import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.scss"
import Footer from '../../components/footer/Footer'

const Layout = () => {
    return (
        <>
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout