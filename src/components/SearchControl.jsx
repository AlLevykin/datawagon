import * as React from 'react'
import { useSelector } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Control from './Control'
import { selectAllTrains } from '../reducers/trainsSlice'

const SearchControl = () => {

  const trains = useSelector(selectAllTrains)

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
        <div style={{ width: '50vw', margin: '20px' }}>
          <Typography variant="h3" gutterBottom>
            Поиск
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>№ поезда</TableCell>
                  <TableCell>Текущая станция</TableCell>
                  <TableCell>Станция назначения</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trains.map((t) => (
                  <TableRow
                    key={t.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {t.id}
                    </TableCell>
                    <TableCell>{t.disl} - {t.dislStation}</TableCell>
                    <TableCell>{t.dest} - {t.destStation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Drawer>
    </>
  );
}

export default SearchControl