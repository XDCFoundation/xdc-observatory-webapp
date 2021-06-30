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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Route, Switch, useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/custom.css';
import SearchIcon from '@material-ui/icons/Search';



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
        overflow: 'hidden',
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#102e84',
        overflow: 'hidden',

    },
    drawerHeader: {
        overflow: 'hidden',
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

    const [open, setOpen] = useState(false)
    const [opencontracts, setOpencontracts] = useState(false)

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
                <p style={{ color: '#4666c4', fontSize: 13, fontFamily: 'Inter', marginLeft: 20, marginTop: '20px' }}>Browse</p>
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
                    <p onClick={() => setOpencontracts(true)}> Contracts <span style={{ marginLeft: '50%' }}><i class="fa fa-angle-right" aria-hidden="true"></i></span></p>
                    <hr className="myhr" />
                </ul>


                <ul className="inside-side-box">
                    <p onClick={() => setOpen(true)}>Tools <span style={{ marginLeft: '65%' }}><i class="fa fa-angle-right" aria-hidden="true"></i></span></p>
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


    const contracts = (subanchor) => (
        <div style={{ overflow: 'revert' }}
            className={clsx(classes.list, {
                [classes.fullList]: subanchor === 'top' || subanchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={() => setOpencontracts(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div className={classes.drawerHeader}>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '4px' }}>
                        <div style={{ marginTop: 10 }}> <span onClick={() => setOpencontracts(false)} style={{ color: 'white', fontSize: 17 }}><i class="fa fa-angle-left" aria-hidden="true"></i></span> </div>
                        <div style={{ color: 'white', marginTop: '14px', fontSize: 13, marginLeft: '8px' }}>Contract</div>
                        <div >
                            <IconButton style={{ color: 'white', marginLeft: '120px' }} onClick={() => setOpencontracts(false)}>
                                {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
                            </IconButton>

                        </div>


                    </div>

                </div>
            </div>


            <List className="side-box">

                <ul className="Live-Network-list">
                    <a style={{ fontSize: 13, color: 'white' }} href='/contracts'>
                        <div>Contracts</div>
                    </a>
                    <hr className="myhr4" />
                </ul>
                <ul className="Live-Network-list">
                    <a style={{ fontSize: 13, color: 'white' }} href='/verify-contracts'>
                        <div >Verify Contracts</div>
                    </a>
                    <hr className="myhr4" />
                </ul>

            </List>

        </div>

    );





    const items = (subanchor) => (
        <div style={{ overflow: 'revert' }}
            className={clsx(classes.list, {
                [classes.fullList]: subanchor === 'top' || subanchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={() => setOpen(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div className={classes.drawerHeader}>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '4px' }}>
                        <div style={{ marginTop: 10 }}> <span onClick={() => setOpen(false)} style={{ color: 'white', fontSize: 17 }}><i class="fa fa-angle-left" aria-hidden="true"></i></span> </div>
                        <div style={{ color: 'white', marginTop: '14px', fontSize: 13, marginLeft: '8px' }}>Tools</div>
                        <div >
                            <IconButton style={{ color: 'white', marginLeft: '120px' }} onClick={() => setOpen(false)}>
                                {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
                            </IconButton>

                        </div>


                    </div>

                </div>
            </div>

            {/* onClick={() => setOpen(false)} */}
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
                <ul style={{ whiteSpace: 'nowrap' }} className="Live-Network-list" >
                    <p>Become a Master Node/Validator</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br />
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
                <ul style={{ whiteSpace: 'nowrap' }} className="Live-Network-list" >
                    <p>Become a Master Node/Validator</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br />
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
                <ul style={{ whiteSpace: 'nowrap' }} className="Live-Network-list" >
                    <p>XcelPay Wallet</p>
                    <hr className="myhr" />
                </ul>
                <ul style={{ whiteSpace: 'nowrap' }} className="Live-Network-list" >
                    <p>Bitfi Hardware Wallet</p>
                    <hr className="myhr" />
                </ul>
            </List>
            <br />
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

    return (

        <div className={classes.root}>

            <CssBaseline />
            <AppBar elevation={0}
                className={clsx(classes.appBar)}
            >
                <Toolbar>


                    <Typography className="Header" >
                        <img className="Shape" src={require("../../../src/assets/images/XDC-Icon.png")}></img>
                        <p className="XDC"> XDC </p>

                        <div>
                            <p className="Network-explorer" id="Network-explorer" >Network Explorer</p>
                        </div>
                        <div >
                            <NavLink to='/token-details'>
                                <p className="Token" id="Token" >Tokens</p>
                            </NavLink>
                        </div>


                    </Typography>
                    <div className="centerbox-td">

                        {/* <p className="description"></p> */}
                        <div className="main-form-container-td">
                            <form method="post">
                                <div>

                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        < img style={{ width: 20, height: 20, marginRight: 5 }} src={require('../../assets/images/Search.png')} />
                                        <input value={filter} onChange={(e) => setFilter(e.target.value)}
                                            style={{ fontSize: 11, letterSpacing: 0.62, color: '#9fa8b1' }} type="text"
                                            className="main-input-td" src={require("../../images/Search.png")} placeholder="Search for an address a transaction or a block number" />
                                        {/* name="NAME" */}


                                        <select className="select-td">
                                            <option selected>Filters</option>
                                            <option >Dummy</option>
                                            <option >Dummy</option>
                                            <option >Dummy</option>
                                            <option >Dummy</option>
                                        </select>
                                    </div>
                                </div>
                                <ul style={{ color: 'black' }}>
                                    {/* if needed above marginTop: '20px', marginLeft: '-45px' */}
                                    <li>
                                        {list.map((name) => {

                                            if (filter.length !== 0) {
                                                if (name.toLowerCase().startsWith(filter.toLowerCase()))
                                                    return <li>{name}</li>
                                            }
                                            else {
                                                return null
                                            }
                                        })

                                        }
                                    </li>
                                </ul>

                            </form>


                        </div>
                    </div>


                    <img className="Shape2" src={require("../../../src/assets/images/Profile.png")}></img>

                    <React.Fragment key={'right'}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={toggleDrawer('right', true)}


                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer className={classes.drawer} anchor={'right'} open={state['right']} >
                            {lists('right')}
                        </Drawer>
                        <Drawer className={classes.drawer} anchor={'right'} open={open} >
                            {items('right')}
                        </Drawer>
                        <Drawer className={classes.drawer} anchor={'right'} open={opencontracts} >
                            {contracts('right')}
                        </Drawer>
                    </React.Fragment>

                </Toolbar>
            </AppBar>



        </div >
    );
}

