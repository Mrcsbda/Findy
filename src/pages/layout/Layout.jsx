import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/footer'
import "./layout.scss"

const Layout = () => {
    return (
        <>
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout