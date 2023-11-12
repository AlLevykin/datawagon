import { createSlice } from '@reduxjs/toolkit'

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const initialState = []

const selectedTrains = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelected: {
            reducer: (state, action) => {
                let newItem = action.payload
                let i = state.findIndex(t => t.id === newItem.id)
                if (i === -1) state.push(newItem)
                else state.splice(i, 1)
            },
            prepare: (train) => {
                let c = {color: [
                    randomInteger(0, 255),
                    randomInteger(0, 255),
                    randomInteger(0, 255)
                ]}
                return { payload: {...train, ...c} }
            }
        }
    },
})

export const getAllSelected = (state) => state.selected

export default selectedTrains