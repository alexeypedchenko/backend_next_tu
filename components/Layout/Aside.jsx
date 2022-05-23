import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import CastleIcon from '@mui/icons-material/Castle';
import RouteIcon from '@mui/icons-material/Route';
import LocationIcon from '@mui/icons-material/CropOriginal';

const links = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Places', path: '/places', icon: CastleIcon },
  { name: 'Routes', path: '/routes', icon: RouteIcon },
  { name: 'Locations', path: '/locations', icon: LocationIcon },
]

const Aside = () => {
  const { pathname } = useRouter()
  const [toggled, setToggled] = useState(false)

  return (
    <List
      sx={{
        width: toggled ? 66 : 300,
        maxWidth: '100%',
        bgcolor: 'background.paper',
        height: '100%',
      }}
      component="nav"
      subheader={
        <ListSubheader component="div" sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '48px',
        }}>
          {!toggled && 'Навигация'}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setToggled(!toggled)}
          >
            {toggled
              ? (<KeyboardDoubleArrowRightIcon />)
              : (<KeyboardDoubleArrowLeftIcon />)
            }
          </IconButton>
        </ListSubheader>
      }
    >
      {links.map((link) => (
        <Link href={link.path} key={link.path}>
          <ListItemButton component="a" selected={link.path === pathname}>
            <ListItemIcon sx={{ paddingLeft: '4px' }}>
              <link.icon />
            </ListItemIcon>
            {!toggled && (<ListItemText primary={link.name} />)}
          </ListItemButton>
        </Link>
      ))}
    </List>
  )
}

export default Aside
