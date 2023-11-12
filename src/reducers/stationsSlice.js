import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = []

export const fetchStations = createAsyncThunk('stations/fetchStations', async () => {
  const response = await client.get('/data/stations.json')
  return response.data
})

const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllStations = (state) => state.stations

export default stationsSlice.reducer