import React from 'react'
import { signout } from '../../firebase/firebaseAuth'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{minHeight: '60px !important'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Travel Ukraine v2.0
        </Typography>
        <Button onClick={signout} variant="contained" color="secondary">
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
