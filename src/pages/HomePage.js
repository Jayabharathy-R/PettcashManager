import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton} from '@mui/material';
    import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function HomePage() {
    return ( 
        <div>
             <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           <AccountBalanceWalletIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PettyCash
          </Typography>
          <Button color="inherit" >Signin</Button>&nbsp;&nbsp;
          <Button color="inherit">Signup</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
        </div>
     );
}


export default HomePage;