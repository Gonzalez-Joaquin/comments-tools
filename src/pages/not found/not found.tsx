import { useNavigate } from 'react-router-dom'
import * as Components from '../../components'

import styles from './not found.module.css'

const not_found = () => {

    const navigate = useNavigate()

    return (
        <section className={`flex ${styles.section}`}>
            <div className={`flex ${styles.data}`}>
                <div>
                    <Components.text type='h4' style_type='text-title' content='Ooops...' size='text-large' />
                    <Components.text type='h6' style_type='text-subtitle' content='Page not found' size='text-medium' />
                </div>
                <Components.text type='p' style_type='text-p' content='This page was not found return home to continue' size='text-small' />
                <Components.button value='Volver' icon='undo' onClick={() => navigate('/')} />
            </div>
            <div className={`flex ${styles.drawings}`}>
                <h4>4</h4>
                <Components.icon icon='globe' style_color='icon-blanco' />
                <h4>4</h4>
            </div>
        </section>
    )
}

export default not_found