import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { Cookie, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { MyAppContext } from "../App";
import axios from '../api/axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';




export default function Profile() {
  const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)
 
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    //alert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

const handleLogout = () => {
  setAuthenticated(null)
  
  axios.post('/logout',{},{
    headers:{
      Authorization :`Bearer ${new Cookies().get("Authorization")}` 
    }
  })
  .then((response)=> {
    localStorage.clear()
    Toast.fire({
      icon: "success",
      title: "Anda Berhasil Logout"
    });
    console.log("Logout SuccessFully",response.data);
  }).catch((error)=> {
    console.log("Logout Failed",error);
  })
}
  

  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
 
        <Tooltip title="Account settings">
          <IconButton
          
            onClick={handleClick}
            size="small"
            sx={{ ml:155 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >

            <Avatar  sx={{alignItems:"center", backgroundColor:"orange", width: 35, height: 35 }}>A.S</Avatar> 
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
     
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(,0,0,0.32))',
            mt: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.723);',
            '& .MuiAvatar-root': {
              width: 32,
              height: 10,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem color='red' onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <div className='celeng'>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
         Settings
        </MenuItem>
        <MenuItem  onClick={handleClose}>
          <ListItemIcon >
            <Logout  fontSize="small" />
          </ListItemIcon>
        <Link to="/" onClick={handleLogout}> Logout</Link>
        </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  );
}

