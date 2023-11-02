import { Navigate, Route } from 'react-router-dom'

import { RoutesWithNotFound } from '../../utils'
import { PublicRoutes } from '../../models/routes'
import { lazy } from 'react'

const Welcome = lazy(() => import('./welcome/welcome'))

const Public = () => {
    return (
        <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PublicRoutes.WELCOME} />} />
            <Route path={PublicRoutes.WELCOME} element={<Welcome />} />
        </RoutesWithNotFound>
    )
}

export default Public