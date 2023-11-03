import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import User, { History } from '../../../models/user.model'
import * as Components from '../../../components'
import { RootState } from '../../../redux/store'

import styles from './history.module.css'

const history = () => {

    const { name, history }: User = useSelector((store: RootState) => store.user)

    const [allHistory, setAllHistory] = useState<History[] | []>(history)

    useEffect(() => setAllHistory(history), [history])

    return (
        <section className='flex'>
            <article className={`flex ${styles.article}`}>
                <Components.text type='h3' style_type='text-subtitle' content={`Este es tu historial ${name}`} />
                <div className='flex'>
                    {allHistory.length > 0 ? (
                        <Components.historyCard history={allHistory} />
                    ) : (
                        <Components.text type='h3' style_type='text-title' content='Su historial esta vacio' styles_color='text-color-error' />
                    )
                    }
                </div>
            </article>
        </section>
    )
}

export default history