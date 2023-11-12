import * as React from 'react'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import SearchControl from './SearchControl'
import TrainControl from './TrainControl'
import HelpControl from './HelpControl'
import { getAllSelected } from '../reducers/selectedTrains'
import MapOnButton from './MapOnButton'

const ControlPanel = () => {

    const trains = useSelector(getAllSelected)

    return (
        <div className="control-panel">
            <Stack spacing={1}>
                <Grid container columns={3} spacing={1}>
                    <Grid item >
                        <HelpControl />
                    </Grid>
                    <Grid item >
                        <MapOnButton />
                    </Grid>                    
                    <Grid item >
                        <SearchControl />
                    </Grid>
                </Grid>
                {trains.map(t => <TrainControl key={t.id} train={t}></TrainControl>)}
            </Stack>
        </div>
    )
}

export default ControlPanel