import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
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