import React, { createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'

export const AppContext = createContext({})

const Router = () => {

    const globalState = {
    }

    return (
        <AppContext.Provider value={globalState}>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicRouter isAuthenticated={""} />}>

                    </Route>
                    <Route element={<PrivateRouter isAuthenticated={""} />}>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Router