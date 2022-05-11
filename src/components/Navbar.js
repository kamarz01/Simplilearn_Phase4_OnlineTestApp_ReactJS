import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
      <>
    <AppBar position='sticky'>
        <Toolbar sx={{width:700,m:'auto'}}>
        <Typography variant='h4' align='center' sx={{flexGrow:1}}>Simplilearn Online Test App</Typography>
        </Toolbar>
    </AppBar>
    <Container>
        <Outlet/>
    </Container>
    </>
  )
}

export default Navbar