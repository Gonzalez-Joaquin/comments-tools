import { useState } from 'react'

import { History } from '../../models/user.model'
import * as Components from './components'

import styles from './history-card.module.css'

interface Props {
    history: History[]
}

const historyCard = ({ history }: Props) => {

    const [activeHistory, setActiveHistory] = useState<number | null>(null)

    return (
        <div className={`flex ${styles.container}`}>
            {history.map((history) => <Components.item idRecived={activeHistory} history={history} key={history.id} onClick={e => setActiveHistory(e)} />)}
        </div>
    )
}

export default historyCard