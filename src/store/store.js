import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from '../reducers/stationsSlice'
import railwaysReducer from '../reducers/railwaysGraph'
import trainsReducer from '../reducers/trainsSlice'
import selectedTrains from '../reducers/selectedTrains'
import mapVisibilityReducer from '../reducers/mapVisibility'

const store = configureStore({
    reducer: {
        stations: stationsReducer,
        railways: railwaysReducer,
        trains: trainsReducer,
        selected: selectedTrains.reducer,
        map: mapVisibilityReducer,
    },
})

export default store