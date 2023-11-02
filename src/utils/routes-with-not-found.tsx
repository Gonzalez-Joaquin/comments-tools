import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

interface Props {
    children: JSX.Element[] | JSX.Element
}

const Page = lazy(() => import('../pages/not found/not found'))

export const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <Routes>
            <Route path={'*'} element={<Page />} />
            {children}
        </Routes>
    )
}

export default RoutesWithNotFound