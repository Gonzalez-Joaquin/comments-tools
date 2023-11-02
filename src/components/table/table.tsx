import { useEffect, useState } from "react"
import Task from "../../types"

import styles from './table.module.css'
import Text from "../typography/typography"

interface Props {
    table: Task[]
}

const table = (props: Props) => {

    const [table, setTable] = useState<Task[]>(props.table)

    useEffect(() => setTable(props.table), [props.table])

    return (
        table.length > 1 ? (
            <div className={styles.tableContainer}>
                <div className={styles.table}>
                    <div className={`flex ${styles.thead}`}>
                        <div>
                            <span>
                                {table[0].title}
                            </span>
                        </div>
                        <div>
                            <span> {table[0].time} </span>
                        </div>
                    </div>
                    <div className={styles.tbody}>
                        {table.map(({ time, title, id }, index) => {
                            if (index > 0) {
                                return (
                                    <div className={`flex ${styles.tableRow}`} key={id}>
                                        <div>
                                            <span>
                                                {title}
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                {time}
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        ) : (
            <div className={styles.container}>
                <Text type="h3" style_type="text-subtitle" content="Comience colocando una tarea!" />
            </div>
        )
    )
}

export default table