import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = []

export const fetchRailways = createAsyncThunk('railways/fetchRailways', async () => {
  const response = await client.get('/data/railways.json')
  return response.data
})

const railwaysGraph = createSlice({
  name: 'railways',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRailways.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllRailways = (state) => state.railways

export default railwaysGraph.reducer