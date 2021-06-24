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
import { NavLink } from 'react-router-dom';


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
                </ul>

            </List>
            <List>
                <Divider />
                <ul>
                    <select className="side-box1">
                        <option selected>Contracts</option>
                        <option>Contract</option>
                        <option>Verify Contract</option>

                    </select>

                </ul>
                <Divider />
                <ul>
                    <select className="side-box2">
                        <option selected>Tools</option>
                        <option>Dummy</option>
                    </select>
                </ul>
                <Divider />
            </List>
            <List className="side-box">
                <ul className="inside-side-box">
                    <p>XinFin APIs</p>
                </ul>
                <Divider />
                <ul style={{ marginTop: 10, marginLeft: -20 }}>
                    <p>Nodes</p>
                </ul>
                <Divider />
            </List>

        </div>
    );


    const list = ["Accounts", "Contract", "Tools", "Xinfin Apis", "Nodes", "Tokens"]
    const [filter, setFilter] = useState("")


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
                            <p className="Network-explorer" id="Network-explorer">Network Explorer</p>
                        </div>
                        <div>
                            <a href='/token-details'>
                                <p className="Token" id="Token">Tokens</p>
                            </a>
                        </div>

                    </Typography>
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

                        <Drawer className={classes.drawer} anchor={'right'} open={state['right']}>
                            {lists('right')}
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






