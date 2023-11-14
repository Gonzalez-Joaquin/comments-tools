import { useEffect, useState } from 'react'
import * as Components from '../../../components'
import data from './assets/data.json'

import styles from './welcome.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/slices/user.slice'

const welcome = () => {

    const [name, setName] = useState('')
    const [mode, setMode] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (mode) {
                dispatch(createUser({ name, table: [], history: [] }))
                navigate('/')
            }
            setMode(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [mode])

    return (
        <section className={`flex ${styles.section}`}>
            <article className={`flex ${styles.article}`}>
                <Components.text type='h3' style_type='text-title' size='text-large' content={data.title} />
                <Components.text type='p' style_type='text-subtitle' size='text-pre-medium' content={data.desc} />
            </article>
            <form className={`flex ${styles.form} ${mode && styles.active}`} onSubmit={handleSubmit}>
                <Components.input name='name' newValue={value => setName(value)} value={name} />
                <Components.button value='Enviar' type='submit' onClick={() => setMode(true)} />
            </form>
        </section>
    )
}

export default welcome