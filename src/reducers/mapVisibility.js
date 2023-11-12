import { createSlice } from '@reduxjs/toolkit'

const initialState = { visibility: false }

export const mapVisibility = createSlice({
  name: 'mapVisibility',
  initialState,
  reducers: {
    changeVisibility: (state, action) => {
        state.visibility = !state.visibility
    }
  }
})

export const { changeVisibility } = mapVisibility.actions

export const isMapVisible = (state) => state.map.visibility

export default mapVisibility.reducer