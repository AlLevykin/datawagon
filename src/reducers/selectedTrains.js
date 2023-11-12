import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const selectedTrains = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelected: {
            reducer: (state, action) => {
                let newItem = action.payload
                let i = state.findIndex(t => t.id === newItem.id )
                if (i === -1) state.push(newItem) 
                else state.splice(i,1)
            },
            prepare: (train) => {
                return { payload: train }
            }
        }
    },
})

export const getAllSelected = (state) => state.selected

export default selectedTrains