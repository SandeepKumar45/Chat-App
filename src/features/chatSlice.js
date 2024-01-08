import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chatId:null,
    user:null
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        chat:(state,action) => {
            state.chatId = action.payload.chatId
            state.user = action.payload.user
        },
        clearChat:(state) => {
            state.chatId = null
            state.user = null
        }
    }
})

export const {chat,clearChat} = chatSlice.actions
export default chatSlice.reducer