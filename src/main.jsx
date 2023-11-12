import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './components/App.jsx'
import store from './store/store.js'
import { fetchStations } from './reducers/stationsSlice.js'
import { fetchRailways } from './reducers/railwaysGraph.js'
import { fetchTrains } from './reducers/trainsSlice.js'
import './styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const pgkTheme = createTheme({
  palette: {
    primary: {
      main: '#7C002F',
    },
  },
});

store.dispatch(fetchStations())
store.dispatch(fetchRailways())
store.dispatch(fetchTrains())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={pgkTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
