import { Navigate, Route } from 'react-router-dom'

import { PrivateRoutes } from '../../models/routes'
import { RoutesWithNotFound } from '../../utils'
import { Header } from '../../layouts'

import { lazy } from 'react'

const Home = lazy(() => import('./home/home.tsx'))
const History = lazy(() => import('./history/history'))

const Private = () => {
    return (
        <>
            <Header />
            <RoutesWithNotFound>
                <Route path='/' element={<Navigate to={PrivateRoutes.HOME} />} />
                <Route path={PrivateRoutes.HOME} element={<Home />} />
                <Route path={PrivateRoutes.HISTORY} element={<History />} />
            </RoutesWithNotFound>
        </>
    )
}

export default Private