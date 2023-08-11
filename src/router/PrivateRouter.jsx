import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRouter = ({ isAuthenticated }) => {
    return (
        <div>
            {isAuthenticated && <Outlet />}
        </div>
    )
}

export default PrivateRouter