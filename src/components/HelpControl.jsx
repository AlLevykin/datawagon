import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Typography from '@mui/material/Typography'
import Control from './Control'

const HelpControl = () => {

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
          <QuestionMarkIcon color="primary" fontSize="small" />
        </IconButton>
      </Control>
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={handleClose}
      >
        <div style={{ width: '50vw' }}>
          <Typography variant="h3" gutterBottom>
            Помощь
          </Typography>
        </div>
      </Drawer>
    </>
  );
}

export default HelpControl