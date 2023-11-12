import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import Control from './Control'
import { changeVisibility } from '../reducers/mapVisibility'
import store from '../store/store'

const MapOnButton = () => {

    const handleClick = () => {
        store.dispatch(changeVisibility())
      };

  return (
      <Control>
        <IconButton size="small" onClick={handleClick}>
          <AddLocationAltIcon color="primary" fontSize="small" />
        </IconButton>
      </Control>
  );
}

export default MapOnButton