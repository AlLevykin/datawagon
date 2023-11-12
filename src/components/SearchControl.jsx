import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Control from './Control'

const SearchControl = () => {

  const [isOpen, toggleDrawer] = React.useState(false);

  const handleClick = () => {
    toggleDrawer(true);
  };

  const handleClose = () => {
    toggleDrawer(false);
  };
  
  return (
    <>
      <Control>
        <IconButton size="small" onClick={handleClick}>
          <SearchIcon color="primary" fontSize="small" />
        </IconButton>
      </Control>
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={handleClose}
      >
        <div style={{ width: '50vw' }}>
          <Typography variant="h3" gutterBottom>
            Поиск
          </Typography>
        </div>
      </Drawer>
    </>
  );
}

export default SearchControl