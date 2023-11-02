import Task from "../types";

const transform = (table: Task[]) => {
    const newString: string[] = table.map(({ id, time, title }) => {
        if (id === 0) {
            return `||*${title}*||*${time}*||`
        }
        return `|${title}|${time}|`
    })

    return newString.join('\n');
}

export default transform