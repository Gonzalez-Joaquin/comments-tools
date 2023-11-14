import { createSlice } from "@reduxjs/toolkit"
import User from "../../models/user.model"

const EmptyUserState: User = { name: '', table: [], history: [] }

const persistLocalStorageUserState = (user: User) => {
    localStorage.setItem('comentarios', JSON.stringify({ ...user }))
}

const clearLocalStorageUserState = () => {
    localStorage.removeItem('comentarios')
}

const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('comentarios') ? JSON.parse(localStorage.getItem('comentarios') as string) : EmptyUserState,
    reducers: {
        createUser: (_state, action) => {
            persistLocalStorageUserState(action.payload)
            return action.payload
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload }
            persistLocalStorageUserState(result)
            return result
        },
        resetUser: () => {
            clearLocalStorageUserState()
            return EmptyUserState
        },
    }
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer