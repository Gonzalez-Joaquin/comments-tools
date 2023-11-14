import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { formatDate, transformTable } from '../../../utils'
import * as Components from '../../../components'
import { RootState } from '../../../redux/store'
import User from '../../../models/user.model'
import Task from '../../../types'

import styles from './home.module.css'
import { updateUser } from '../../../redux/slices/user.slice'


const home = () => {

    const user: User = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch()

    const [actualyId, setActualyId] = useState<number | null>(null)
    const [title, setTitle] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [mode, setMode] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)

    const emptyTable: Task[] = [{ id: 0, title: user.name, time: formatDate(new Date) }]

    const [table, setTable] = useState<Task[]>(emptyTable)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        !mode ? addTask() : editTask()
    }

    const addTask = () => {
        const newTask: Task = { id: Math.max(...table.map(task => task.id)) + 1, title, time }
        if (title === '' || time === '') { alert('Complete los campos para continuar'); return; }
        dispatch(updateUser({ name: user.name, table: [...user.table, newTask] }))
        setTable([...table, newTask]); setTitle(''); setTime('');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            user.table.length < 1 && setTable(emptyTable)
            user.table.length < 1 && dispatch(updateUser({ name: user.name, table: [...table] }))
            user.table.length > 1 && setTable(user.table)
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const handleSave = () => {
        const history = [{ id: 0, table }]
        const newHistory = { id: Math.max(...user.history.map(history => history.id)) + 1, table }

        dispatch(updateUser(
            {
                name: user.name,
                table: [],
                history: user.history.length < 1 ? history : [...user.history, newHistory]
            }
        ))

        setTable(emptyTable)
    }

    const handleDelete = (id: number) => {
        setTable(table.filter(table => table.id !== id))
        if (table.length === 1) {
            dispatch(updateUser({ name: user.name, table: [] }))
            return
        }
        dispatch(updateUser({ name: user.name, table: [...user.table.filter(table => table.id !== id)] }))
    }

    const editTask = () => {
        if (actualyId !== null) {
            const updated: Task = { id: actualyId, title, time }
            setTable(table.map(table => {
                if (table.id === actualyId) { return updated } return table
            }))
        }
        setTime(''); setTitle(''); setMode(false);
    }

    useEffect(() => {
        if (mode === false) {
            dispatch(updateUser({ user: user.name, table }))
        }
    }, [mode])

    return (
        <section className='flex'>
            <article className={`flex ${styles.data}`}>
                <div>
                    <Components.text type='h2' style_type='text-title' content={`Bienvenido ${user.name}!`} size='text-pre-medium' />
                    <Components.text type='p' style_type='text-subtitle' content='Empezemos creando una tabla' styles_color='text-secundario' />
                </div>
                <form onSubmit={handleSubmit}>
                    <Components.input placeholder='Tarea: ' name='task' newValue={value => setTitle(value)} value={title} />
                    <Components.input placeholder='Tiempo: ' name='task' newValue={value => setTime(value)} value={time} />
                    <Components.button value={!mode ? 'Agregar' : 'Confirmar'} icon={!mode ? 'plus' : 'pencil'} type='submit'
                        disabled={title === '' && true || time === '' && true}
                    />
                </form>
            </article>
            <article className={`flex ${styles.container}`}>
                <Components.table table={table}
                    currentPage={currentPage}
                    setCurrentPage={e => setCurrentPage(e)}
                    handleDelete={e => handleDelete(e)}
                    handleEdit={e => {
                        table.map(({ title, time, id }) => { if (id === e) { setTitle(title); setTime(time) } })
                        setActualyId(e)
                        setMode(true)
                    }}
                />
                <div className='flex' style={{ gap: '20px', width: '100%', justifyContent: 'flex-end' }}>
                    <Components.button value='Eliminar' onClick={() => {
                        setTable(emptyTable)
                        dispatch(updateUser({ user: user.name, table: emptyTable }))
                    }} disabled={table.length <= 1 && true} />
                    <CopyToClipboard text={transformTable(table)}>
                        <Components.button value='Copiar' onClick={() => handleSave()} disabled={table.length <= 1 && true} />
                    </CopyToClipboard>
                </div>
            </article>
        </section>
    )
}

export default home