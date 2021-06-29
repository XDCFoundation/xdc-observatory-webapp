import React, { useState } from 'react';
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
import { NavLink, useHistory } from 'react-router-dom';
import { TableCell } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#2149b9',
        height: '60px',
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
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },

    list: {
        width: 250,
        backgroundColor: '#102e84',
        height: '100%',
    },
    fullList: {
        width: 'auto',
    },

}));


export default function Navbar() {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

   

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const lists = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{
                    color: '#4666c4',
                    fontSize: 13,
                    fontFamily: 'Inter',
                    marginLeft: 20,
                    marginTop: '20px'
                }}>Browse</p>
                <div style={{ marginLeft: 120 }} className={classes.drawerHeader}>
                    <IconButton style={{ color: 'white' }} onClick={toggleDrawer(anchor, false)}>
                        {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
                    </IconButton>
                </div>
            </div>


            <List className="side-box">
                <ul className="inside-side-box">
                    <p>Accounts</p>
                    <hr className="myhr" />
                </ul>
                <ul className="inside-side-box">
                    <p>Contracts</p>
                    <hr className="myhr" />
                </ul>
                <ul  className="inside-side-box">
                    <p onClick={toggleDroz('right', true)}>Tools</p>
                    <hr className="myhr" />
                </ul>
                <ul className="inside-side-box">
                    <p>XinFin APIs</p>
                    <hr className="myhr" />
                </ul>
                <ul className="inside-side-box" >
                    <p>Nodes</p>
                    <hr className="myhr" />
                </ul>
            </List>
           

        </div>
    );

    const list = ["Accounts", "Contract", "Tools", "Xinfin Apis", "Nodes", "Tokens"]
    const [filter, setFilter] = useState("")

// ..................

    const toggleDroz = (subanchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [subanchor]: open });
    };

    const items = (subanchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: subanchor === 'top' || subanchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDroz(subanchor, false)}
        >
             <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{
                    color: 'white',
                    fontSize: 11,
                    fontFamily: 'Inter',
                    marginLeft: 20,
                    marginTop: '15px',
                }}> <span onClick={toggleDroz(subanchor, false)} style={{fontSize: 20, marginRight: '2px'}}> <i class="fa fa-angle-left" aria-hidden="true"></i> </span> Tools</p>
                <div style={{ marginLeft: 120 }} className={classes.drawerHeader}>
                    <IconButton style={{ color: 'white' }} onClick={toggleDroz(subanchor, false)}>
                        {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
                    </IconButton>
                </div>
            </div>


            <List className="side-box">
                <ul className="Live-Network">
                    <p>Live Network</p>
                  
                </ul>
                <ul className="Live-Network-list">
                    <p>Web Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p >Android wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p>Block Explorer</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list" >
                    <p>XinFin APIs</p>
                    <hr className="myhr" />
                </ul>
                <ul style={{whiteSpace: 'nowrap'}} className="Live-Network-list" >
                    <p>Become a Master Node/Validator</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br/>
            <List className="side-box">
                <ul className="Live-Network">
                    <p>Sand Box/Testnet</p>
                  
                </ul>
                <ul className="Live-Network-list">
                    <p>Faucet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p >Web wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p>Block Explorer</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list" >
                    <p>XinFin APIs</p>
                    <hr className="myhr" />
                </ul>
                <ul style={{whiteSpace: 'nowrap'}} className="Live-Network-list" >
                    <p>Become a Master Node/Validator</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br/>
            <List className="side-box">
                <ul className="Live-Network">
                    <p>Supported Wallet</p>
                  
                </ul>
                <ul className="Live-Network-list">
                    <p>Guarda Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p >D'CENT Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p>D'CENT Hardware Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list" >
                    <p>Freewallet</p>
                    <hr className="myhr" />
                </ul>
                <ul style={{whiteSpace: 'nowrap'}} className="Live-Network-list" >
                    <p>XcelPay Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul style={{whiteSpace: 'nowrap'}} className="Live-Network-list" >
                    <p>Bitfi Hardware Wallet</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br/>
            <List className="side-box">
                <ul className="Live-Network">
                    <p>More</p>
                  
                </ul>
                <ul className="Live-Network-list">
                    <p>XinPay</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p >XinFin Remix</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list">
                    <p>One-Click Node Installer</p>
                    <hr className="myhr" />
                </ul>
                <ul className="Live-Network-list" >
                    <p>Explore dApps</p>
                    <hr className="myhr" />
                </ul>

            </List>

        </div>
        
    );

  // ..................  

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={0}
                className={clsx(classes.appBar)}
            >
                <Toolbar>


                    <Typography className="Header">
                        <img className="Shape" src={require("../../../src/assets/images/XDC-Icon.png")}></img>
                        <p className="XDC"> XDC </p>

                        <div>
                            <a href='/'>
                                <p className="Network-explorer" id="Network-explorer">Network Explorer</p>
                            </a>
                        </div>
                        <div>
                            <a href='/token-details'>
                                <div className="Token" id="Token">Tokens</div>
                            </a>
                        </div>

                    </Typography>
                    <img className="Shape2" src={require("../../../src/assets/images/Profile.png")}></img>

                    <React.Fragment key={'right'}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            // onClick={toggleDrawer('right', true)}
                            onClick={toggleDroz('left', true)}
                            
                           

                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer className={classes.drawer} anchor={'right'} open={state['right']}>
                            {lists('right')}
                        </Drawer>
                        <Drawer className={classes.drawer} anchor={'left'} open={state['left']}>
                            {items('left')}
                        </Drawer>
                      
                    </React.Fragment>

                </Toolbar>


            </AppBar>
            <main
                className={clsx(classes.content)}
            >


                <div className="exp-parent">
                    <img className="Shape3" src={require("../../../src/assets/images/Networkexplorer.png")}></img>
                    <div className="exp">Network Explorer</div>
                </div>
                {/* ------------ Search bar ----------------- */}

                <div className="centerbox-parent">
                    <div className="centerbox">

                        <p className="description"></p>
                        <div className="main-form-container">
                            <form method="post">

                                <input value={filter} onChange={(e) => setFilter(e.target.value)}
                                    style={{ fontSize: 13, letterSpacing: 0.62, color: '#9fa8b1' }} type="text"
                                    className="main-input"
                                    placeholder="Search for an address a transaction or a block number" />
                                {/* name="NAME" */}

                                <select className="select">
                                    <option selected>All Filters</option>
                                    <option>Dummy</option>
                                    <option>Dummy</option>
                                    <option>Dummy</option>
                                    <option>Dummy</option>
                                </select>
                            </form>

                            <ul style={{ color: 'black' }}>
                                {list.map((name) => {

                                    if (filter.length !== 0) {
                                        if (name.toLowerCase().startsWith(filter.toLowerCase()))
                                            return <li>{name}</li>
                                    } else {
                                        return null
                                    }
                                })

                                }

                            </ul>

                        </div>
                    </div>
                </div>

                {/* <button type="button" id="main-submit-mobile">Search</button>

                {/* ------------ Search bar ----------------- */}


                {/* <div>
                    <MarketTable />
                </div> */}

            </main>

        </div>
    );
}



