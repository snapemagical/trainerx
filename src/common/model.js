
import {Button,Dialog,DialogActions,DialogTitle} from '@mui/material';
export const DeleteModel = ({title, show,handleClose,handleConfirm }) => {
    return <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
        {title?title:'Are you sure you want to delete this item?'}
        </DialogTitle>
        <DialogActions>
            <Button onClick={handleConfirm} className='btn btn-primary'>Ok</Button>
            <Button onClick={handleClose} className='btn btn-cancel'>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}