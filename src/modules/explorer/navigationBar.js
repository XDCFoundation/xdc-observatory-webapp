import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import marketDatatable from '../explorer/marketDatatable';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { transparent } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import { Grid, Box, redarrow, greenarrow } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#2149b9',
        height: '354px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#102e84'

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    divider: {
        Color: 'red',
        width: '100%'
      },
    
}));



export default function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };




    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            >
                <Toolbar>


                    <Typography className="XDC" >
                        <img className="Shape" src={require("../../../src/assets/images/XDC-Icon.png")}></img>
                        <h5> XDC </h5>

                        <div>
                            <p className="Network-explorer" id="Network-explorer" >Network Explorer</p>
                        </div>
                        <div >
                            <p className="Token" id="Token" >Tokens</p>
                        </div>


                    </Typography>
                    <img className="Shape2" src={require("../../../src/assets/images/Profile.png")}></img>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <img className="Shape3" src={require("../../../src/assets/images/Networkexplorer.png")}></img>
                <div className="exp">Network Explorer</div>

                {/* Search bar */}

                <div className="centerbox">

                    <p className="description"></p>
                    <div className="main-form-container">
                        <form method="post">

                            <input type="text" className="main-input main-name" name="NAME" placeholder="Search for an address a transaction or a block number" />

                            <select className="select" >
                                <option selected>All Fiters</option>
                                <option >Dummy</option>
                                <option >Dummy</option>
                                <option >Dummy</option>
                                <option >Dummy</option>
                            </select>

                        </form>
                    </div>
                </div>


                {/* <button type="button" id="main-submit-mobile">Search</button> */}

                {/* Search bar */}
                {/* <marketDatatable/> */}
                
            </AppBar>
           
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div />

                {/* ............................. */}
               
         {/* ............................. */}       
            </main>


            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
               <div style={{display: 'flex', flexDirection: 'row'}}>
               <p style={{color: '#4666c4',fontSize: 13,fontFamily: 'Inter', marginLeft: 20, marginTop: '20px'}}>Browse</p>
               <div style={{marginLeft: 120}} className={classes.drawerHeader}>
                    <IconButton style={{color: 'white'}} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <CloseIcon/> : <CloseIcon />}
                    </IconButton>
                </div>
                   </div>
               
              
              
                  <List className="side-box" >
                    <ul className="inside-side-box">
                        <p>Accounts</p>
                    </ul>
                  
                  </List> 
                  <List>
                  <Divider />
                    <ul>
                        <select className="side-box1" >
                            <option selected>Contracts</option>
                            <option >Contract</option>
                            <option >Verify Contract</option>

                        </select>

                    </ul>
                    <Divider  />
                    <ul>
                        <select className="side-box2" >
                            <option selected>Tools</option>
                            <option >Dummy</option>
                        </select>
                    </ul>
                    <Divider  />
                    </List>
                    <List className="side-box" >
                    <ul className="inside-side-box">
                        <p>XinFin APIs</p>
                    </ul>
                    <Divider/>
                    <ul style={{marginTop: 10, marginLeft: -20}}>
                        <p>Nodes</p>
                    </ul>
                  <Divider/>
                  </List> 
                 
                
                  
            </Drawer>



        </div>
    );
}







