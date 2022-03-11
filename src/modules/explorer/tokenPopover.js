import React from 'react'
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/styles";
import { sessionManager } from '../../managers/sessionManager';

const useStyles = makeStyles((theme) => ({
    popoverBox: {
        width: "134px",
        position: "absolute",
        marginLeft: "279px",
        marginTop: "58px",
    },
    listItem: {
        padding: "14px",
        borderBottom: "1px solid #f9f9f9"
    }
}))

export default function TokenPopover(props) {
    const classes = useStyles();
    const handleXRC20 = () => {
        sessionManager.setDataInCookies(false, "xrc20")
    }
    const handleXRC721 = () => {
        sessionManager.setDataInCookies(true, "xrc20")
    }

    let ercValue = sessionManager.getDataFromCookies("xrc20")
    ercValue = ercValue==="true"
    
  return (
    <div>
        <Popover
        open={props.open}
        onClose={props.handleClose}
        classes={{paper: classes.popoverBox}}
        >
            <a style={{color: ercValue ? "#2a2a2a": "#2149b9", fontSize: "15px"}} href="/tokens" ><div onClick={handleXRC20} className={classes.listItem}>XRC-20</div></a>
            <a style={{color: ercValue ? "#2149b9" : "#2a2a2a", fontSize: "15px"}} href="/tokens"><div onClick={handleXRC721}className={classes.listItem}>XRC-721</div></a>
        </Popover>
    </div>
  )
}

