import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    paperWidthSm: {
        maxWidth: "320px",
        width: "100%",
        borderRadius: "8px",
        margin: "20px",
    }
}));

function ConfigureColumnsModal(props) {
    const classes = useStyles();
    return (
        <Dialog
            className=""
            classes={{paperWidthSm: classes.paperWidthSm}}
            open={props.isOpen}
            onClose={props.onModalClose}
            aria-labelledby="form-dialog-title"
        >
            <div className="w-320">
                <div className="fs-14 fw-bold p-t-15 p-b-15 display-flex justify-content-center">Configure Columns</div>
                <div className="margin-0 m-b-15 b-t-1"/>
                <div className="p-l-15 p-r-15">
                    {
                        props.tableColumns && Object.keys(props.tableColumns).map(key => {
                            if (key !== 'Balance')
                                return (
                                    <div className="display-flex justify-content-between p-b-25">
                                        <div className="display-flex">
                                            <Tooltip align="right" title={props.tableColumns[key].toolTipText}>
                                                <img className="tooltipInfoIconConfigMob"
                                                    src="/images/info.svg"></img>
                                            </Tooltip>
                                            <div className="p-l-12">{key}</div>
                                        </div>
                                        <div onClick={() => props.toggleTableColumns(key)}>
                                            {props.tableColumns[key].isActive ?
                                                <img className="" src="/images/active-switch.svg" /> :
                                                <img className="" src="/images/inactive-switch.svg" />}
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </Dialog>)
}

export default ConfigureColumnsModal;