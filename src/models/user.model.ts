import Task from "../types"

interface User {
    name: string,
    table: Task[]
    history: History[]
}

export interface History {
    id: number,
    table: Task[]
}

export default User