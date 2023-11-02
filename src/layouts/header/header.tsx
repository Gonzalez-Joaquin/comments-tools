import { NavLink } from 'react-router-dom'

import { PrivateRoutes } from '../../models/routes'
import * as Components from '../../components'

import styles from './header.module.css'

const header = () => {
    return (
        <header className={`flex ${styles.header}`}>
            <Components.text type='h1' style_type='text-subtitle' content='Generador de Comentarios' />
            <nav>
                <NavLink to={PrivateRoutes.HOME}
                    className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Inicio
                </NavLink>
                <NavLink to={PrivateRoutes.HISTORY}
                    className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Historial
                </NavLink>
            </nav>
        </header >
    )
}

export default header