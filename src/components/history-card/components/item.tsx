import { useEffect, useState } from "react"

import { History } from "../../../models/user.model"
import * as Components from "../../../components"
import Task from "../../../types"

import styles from './item.module.css'

interface Props {
    idRecived: number | null
    history: History
    onClick: (value: number | null) => void
}

const item = (props: Props) => {
    const { idRecived, history, onClick } = props
    const { id, table } = history

    const [historyTasks, setHistoryTasks] = useState<Task[]>(table)
    const [currentPage, setCurrentPage] = useState(0)
    const [mode, setMode] = useState(false)

    const getTable = () => historyTasks.slice(currentPage, currentPage + 5)

    useEffect(() => {
        idRecived === id && setMode(!mode)
        return () => setMode(false)
    }, [idRecived])

    useEffect(() => {
        setHistoryTasks(table)
    }, [table])

    return (
        <div className={`flex ${styles.item} ${mode && styles.open} `}>
            <div className={`flex ${styles.button} ${mode && styles.open}`} onClick={() => onClick(mode ? null : id)}>
                <span>
                    {table[0].time}
                </span>
                <Components.icon icon={`angle-down ${mode && styles.arrowOpen}`} style_color={!mode ? 'icon-color-great' : 'icon-color-error'} />
            </div>
            <div className={`grid ${styles.taskContainer} ${mode && styles.open}`}>
                {table.length > 5 && mode && (
                    <div className={`flex ${styles.pagination}`}>
                        <button onClick={() => setCurrentPage(currentPage - 4)}
                            disabled={currentPage + 4 > historyTasks.length || currentPage !== 0 ? false : true}
                        >
                            <Components.icon icon="angle-left" style_color="icon-color-details" />
                        </button>
                        <button onClick={() => setCurrentPage(currentPage + 4)}
                            disabled={currentPage + 4 < historyTasks.length ? false : true}
                        >
                            <Components.icon icon="angle-right" style_color="icon-color-details" />
                        </button>
                    </div>
                )}
                {getTable().map(({ id, time, title }, index) => {
                    if (index > 0) {
                        return (
                            <div key={id} className={`flex ${styles.task}`}>
                                <Components.text type="h4" style_type="text-title" styles_color="text-primario" content={title} />
                                <Components.text type="h5" style_type="text-subtitle" styles_color="text-secundario" content={time} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default item