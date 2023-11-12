import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = []

export const fetchTrains = createAsyncThunk('trains/fetchTrains', async () => {
  const response = await client.get('/data/trains.json')
  return response.data
})

const trainsSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrains.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllTrains = (state) => state.trains

export default trainsSlice.reducer