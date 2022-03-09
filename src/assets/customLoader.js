import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundImage: `url(${"/images/xdc-icon-blue-color.svg"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        justifyContent: "center",

        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
    },
    loaderStyle: {
        color: grey[100],
    },
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={172} className={classes.loaderStyle}/>
        </div>
    );
}