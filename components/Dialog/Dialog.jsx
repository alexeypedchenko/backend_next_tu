import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AlertDialog = ({ btnText, title, description, ok, size, color }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} size={size} color={color}>
        {btnText}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        {description && (
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={ok}>Подтвердить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AlertDialog.defaultProps = {
  btnText: 'Open alert dialog',
  title: 'Alert Dialog',
  description: '',
  ok: () => {},
  size: 'small',
  color: 'primary'
}

export default AlertDialog
