import * as React from 'react'
import { styled } from '@mui/material/styles'
import Control from './Control'
import CloseIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseDialogIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import selectedTrains from '../reducers/selectedTrains'
import store from '../store/store'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const TrainControl = (props) => {

    let train = props.train

    const [openDialog, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleClose = () => {
        store.dispatch(selectedTrains.actions.setSelected(train))
    };

    return (
        <>
            <Control>
                <Typography variant="body2" gutterBottom>
                    Поезд № <strong>{train.id} </strong>
                    <IconButton onClick={handleOpenDialog} >
                        <InfoIcon color="primary" fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleClose} >
                        <CloseIcon color="primary" fontSize="small" />
                    </IconButton>
                </Typography>
            </Control>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Поезд № {train.id}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseDialogIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Текущая станция: <strong>{train.disl} - {train.dislStation}</strong>
                    </Typography>
                    <Typography gutterBottom>
                        Станция назначения: <strong>{train.dest} - {train.destStation}</strong>
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>№ вагона</TableCell>
                                    <TableCell>Станция назначения</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {train.wagons.map((w) => (
                                    <TableRow
                                        key={w.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {w.id}
                                        </TableCell>
                                        <TableCell>{w.dest} - {w.destStation}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>
                        Закрыть
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    )
}

export default TrainControl