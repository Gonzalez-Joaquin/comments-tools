import { useEffect, useState } from "react"
import Task from "../../types"

import Text from "../typography/typography"
import Icon from "../icon/icon"
import Button from '../button/button'

import styles from './table.module.css'

interface Props {
    table: Task[]
    handleDelete: (id: number) => void
    handleEdit: (id: number) => void
    setCurrentPage: (value: number) => void
    currentPage: number
}

const table = (props: Props) => {
    const { currentPage, setCurrentPage, handleDelete, handleEdit } = props

    const [table, setTable] = useState<Task[]>(props.table)
    const all = () => table.slice(currentPage, currentPage + 11)
    useEffect(() => { setTable(props.table); props.table.length === 11 && setCurrentPage(0) }, [props.table])

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
                        <div className={styles.actions}>
                            <span>
                                Actions
                            </span>
                        </div>
                    </div>
                    <div className={styles.tbody}>
                        {all().map((table, index) => {
                            if (index > 0) {
                                return (
                                    <div className={`flex ${styles.tableRow}`} key={table.id}>
                                        <div>
                                            <span>
                                                {table.title}
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                {table.time}
                                            </span>
                                        </div>
                                        <div className={styles.actions}>
                                            <div className={`flex ${styles.buttons}`}>
                                                <button className="flex" onClick={() => handleEdit(table.id)} >
                                                    <Icon icon='pencil' />
                                                </button>
                                                <button className="flex" onClick={() => handleDelete(table.id)}>
                                                    <Icon icon='trash' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {table.length > 11 && (
                            <div className={`flex ${styles.tableRow}`}>
                                <div className={`flex ${styles.buttonsContainer}`}>
                                    <div className='flex' style={{ gap: '20px' }}>
                                        <Button icon="angle-left"
                                            onClick={() => setCurrentPage(currentPage - 10)}
                                            disabled={
                                                currentPage + 11 > table.length || currentPage !== 0 ? false : true
                                            } />
                                        <Button icon="angle-right"
                                            onClick={() => setCurrentPage(currentPage + 10)}
                                            disabled={
                                                currentPage + 11 < table.length ? false : true
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        ) : (
            <div className={styles.container}>
                <Text type="h3" style_type="text-subtitle" content="Comience colocando una tarea!" />
            </div>
        )
    )
}

export default table