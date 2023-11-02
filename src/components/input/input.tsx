import styles from './input.module.css'

interface Props {
    type?: 'text'
    name: string
    placeholder?: string
    newValue: (value: string) => void
    value: string,
}

const input = ({ name, placeholder, type, newValue, value }: Props) => {
    return (
        <div className={styles.container}>
            {
                placeholder && <label htmlFor={name} className={styles.label}>{placeholder}</label>
            }
            <input type={type || 'text'} id={name} name={name} autoComplete='off' value={value} className={styles.input} onChange={(e) => newValue(e.target.value)} />
        </div>
    )
}

export default input