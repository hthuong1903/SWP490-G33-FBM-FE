import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export default function CancelReceipt({title, isOpen, handleClose, handleConfirm, isEdit}) {

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Hủy bỏ</Button>
                <Button>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}