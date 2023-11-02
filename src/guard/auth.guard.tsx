import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PublicRoutes } from '../models/routes'
import { RootState } from '../redux/store'

const AuthGuard = () => {
    const user = useSelector((store: RootState) => store.user)

    return user.name !== '' ? <Outlet /> : <Navigate replace to={PublicRoutes.PUBLIC} />
}

export default AuthGuard