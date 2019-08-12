import React, { useState } from 'react';

import NavItems from '../NavItems/NavItems';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import classes from './Topbar.css';

const Topbar = props => {

    const [openedDrawer, setOpenedDrawer] = useState(false);

    // Handle side drawer (for mobile menu)
    const closeDrawerHandler = () => {
        setOpenedDrawer(false);
    }

    const openDrawerHandler = () => {
        setOpenedDrawer(true);
    }

    return (
        <div className={classes.TopbarContainer}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                        Squad Builder
                    </Typography>
                    <NavItems />
                    <MenuIcon onClick={openDrawerHandler} className={classes.DrawerToggle} />
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={openedDrawer} onClose={closeDrawerHandler}>
                <NavItems mobileNav={true} onLinkClick={closeDrawerHandler} />
            </Drawer>
        </div>
    );
}

export default Topbar;