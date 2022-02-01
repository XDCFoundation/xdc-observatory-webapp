import React, {useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {makeStyles} from "@material-ui/styles";
import {Row} from "simple-flexbox";
import {TransactionService, UserService} from "../../services";
import utility, {dispatchAction} from "../../utility";
import {cookiesConstants, eventConstants, genericConstants} from "../../constants";
import {connect} from "react-redux";
import {sessionManager} from "../../managers/sessionManager";

const useStyles = makeStyles((theme) => ({
    add: {
        backgroundColor: "#2149b9",
        marginLeft: "90px",
    },
    btn: {
        border: "none !important",
        background: "none",
        "&:hover": {background: "none"},
    },
    cnlbtn: {
        width: "94px",
        height: "34px",
        borderRadius: "4px",
        backgroundColor: "#9fa9ba",
        color: "white",

        margin: "14px 8px 15px 2px",
    },
    buttons: {
        justifyContent: "space-between",
        padding: "10px 35px 15px 0px",
    },
    value: {
        width: "400px !important",
    },
    cross: {
        marginTop: "25px",
        marginLeft: "40px",
        fontWeight: "500",
    },
    dialogBox: {
        width: "553px",
        position: "absolute",
        top: "111px",
        borderRadius: "12px",
    },
    error: {
        color: "red",
        marginLeft: "2px",
        marginTop: "-20px",
    },
    input: {
        width: "506px",
        height: "10px",
        border: "solid 1px #c6c8ce",
        backgroundColor: "#ffffff",
        borderRadius: "7px",
        padding: "20px",
        outline: "none",
        marginBottom: "21px",
    },
    textarea: {
        width: "503px",
        height: "90px",
        border: "solid 1px #c6c8ce",
        backgroundColor: "#ffffff",
        borderRadius: "7px",
        padding: "20px",
        outline: "none",
        resize: "none",
    },

    updatebtn: {
        width: "110px",
        height: "34px",
        margin: "14px -8px 15px 2px",
        borderRadius: "4px",
        backgroundColor: "#3763dd",
        color: "white",
    },

    deletebtn: {
        width: "110px",
        height: "34px",
        margin: "14px 0px 15px 20px",
        borderRadius: "4px",
        backgroundColor: "Red",
        color: "white",
    },
    subCategory: {
        marginTop: "-12px",
        marginBottom: "2px",
        fontFamily: "Inter",
        fontSize: "14px",
        color: "#2a2a2a",
        fontWeight: "500",
        border: "none !important",
    },
    forgotpass: {
        color: "#2149b9",
        marginLeft: "123px",
    },
    createaccount: {
        color: "#2149b9",
        marginLeft: "32px",
        fontfamily: "Inter",
        fontsize: "14px",
    },
    icon: {
        marginLeft: "-30px",
    },
    xdc: {
        color: "#2a2a2a",
        marginLeft: "30px",
        fontfamily: "Inter",
        fontsize: "5px",
    },
    heading: {
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: "24px",
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "18px",
        color: "#2a2a2a",
    },
    "@media (max-width: 767px)": {
        heading: {
            fontSize: "16px",
        },
        dialogBox: {
            width: "100%",
            top: "40px",
            borderRadius: "0px !important",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
        },
        input: {
            maxWidth: "503px",
            width: "100%",
        },
        textarea: {
            maxWidth: "503px",
            width: "100%",
            padding: "15px",
        },
        flexButton: {
            display: "flex",
        },
    },
}));

function EditTxnLabel(props) {
    const [open, setOpen] = React.useState(false);
    const [TransactionsHash, setTransactionsHash] = React.useState("");
    const [PrivateNote, setPrivateNote] = React.useState("");
    const [error, setError] = React.useState("");
    const [passwordShown, setPasswordShown] = React.useState(false);
    const [id, setId] = React.useState("");
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    useEffect(() => {
        if (props.row.transactionHash)
            setTransactionsHash(props.row.transactionHash);
        setPrivateNote(props.row.trxLable);
        setId(props.row._id);
    }, [props]);

    async function editTransactionLable() {
        const data = {
            ...props.row,
            trxLable: PrivateNote,
            transactionHash: TransactionsHash,
            modifiedOn: Date.now()
        };
        
        // const [error, response] = await utility.parseResponse(
        //   UserService.editUserPrivateNote(data)
        // );
        // if (error) {
        //   utility.apiFailureToast("Error");
        //   return;
        // }

        let transactionLabel = localStorage.getItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_TRASACTION_LABELS
        );
        transactionLabel = JSON.parse(transactionLabel);
        transactionLabel[props.index] = data;

        const existingTransactionLabel = transactionLabel.find(
            (item, innerIndex) =>
                item.transactionHash == TransactionsHash && item.userId == data.userId && props.index !== innerIndex
        );
        if (existingTransactionLabel) {
            utility.apiFailureToast("Transaction private note is already in use");
            return;
        }

        localStorage.setItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_TRASACTION_LABELS,
            JSON.stringify(transactionLabel)
        );
        utility.apiSuccessToast("Private Note Updated");
        handleClose();
        await props.getListOfTxnLabel();
        await props.getTotalCountTxnLabel();
    }

    const classes = useStyles();

    const handleClickOpen = () => {
        window.scrollTo(0, 0);
        setOpen(true);
    };

    const handleClose = async () => {
        setTransactionsHash(props.row.transactionHash);
        setOpen(false);
    };
    const validateTransaction = () => {
        if (
            (TransactionsHash && TransactionsHash.length === 66) ||
            TransactionsHash.slice(0, 1) == "0x"
        ) {
            editTransactionLable();
        } else {
            setError("Please add address that is having 43 characters and initiates with xdc");
        }
    };
    const handleDelete = async () => {
        // if (props?.row?._id) {
        props.dispatchAction(eventConstants.SHOW_LOADER, true);
        // const [error, response] = await utility.parseResponse(
        //   TransactionService.deleteTransactionPrivateNote(
        //     { _id: props.row._id },
        //     props.row
        //   )
        // );
        let transactionLabel = localStorage.getItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_TRASACTION_LABELS
        );
        transactionLabel = JSON.parse(transactionLabel);
        let innerIndex = null;
        const existingTransactionLabel = transactionLabel.find(
            (item, index) => {
                if (item.transactionHash == props?.row.transactionHash && item.userId == sessionManager.getDataFromCookies("userId")) {
                    innerIndex = index;
                    return true;
                }
            }
        );
        if (existingTransactionLabel) {
            transactionLabel.splice(innerIndex, 1)
        }

        localStorage.setItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_TRASACTION_LABELS, JSON.stringify(transactionLabel)
        );
        props.getListOfTxnLabel()
        props.dispatchAction(eventConstants.HIDE_LOADER, true);

        // if (error || !response) {
        //   utility.apiFailureToast(
        //     error?.message || genericConstants.CANNOT_DELETE_TXN_PRIVATE_NOTE
        //   );
        //   return;
        // }
        await utility.apiSuccessToast(genericConstants.TXN_PRIVATE_NOTE_DELETED);
        await handleClose();
        await props.getListOfTxnLabel();
        await props.getTotalCountTxnLabel();
        // }
    };
    return (
        <div>
            <div onClick={handleClickOpen}>
                <button className={classes.btn}>
                    <a className="linkTable">
                        <span className="tabledata1">Edit</span>
                    </a>
                </button>
            </div>

            <div>
                <Dialog
                    classes={{paperWidthSm: classes.dialogBox}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div>
                    <Row>
                        <div className={classes.heading} id="form-dialog-title">
                            Edit Transaction label
                        </div>
                    </Row>
                    <DialogContent>
                        <DialogContentText className={classes.subCategory}>
                            Transaction Hash
                        </DialogContentText>
                        <input
                            type="text"
                            readOnly
                            className={classes.input}
                            value={TransactionsHash}
                            onChange={(e) => {
                                setTransactionsHash(e.target.value);
                                setError("");
                            }}
                        ></input>
                        {error ? <div className={classes.error}>{error}</div> : <></>}
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText className={classes.subCategory}>
                            Transaction Label/Note
                        </DialogContentText>

                        <textarea
                            type="text"
                            className={classes.textarea}
                            value={PrivateNote}
                            onChange={(e) => setPrivateNote(e.target.value)}
                        ></textarea>
                    </DialogContent>

                    <DialogActions className={classes.buttons}>
                        <div>
              <span>
                <button className={classes.deletebtn} onClick={handleDelete}>
                  Delete
                </button>
              </span>
                        </div>
                        <div className={classes.flexButton}>
              <span style={{color: "white"}}>
                <button className={classes.cnlbtn} onClick={handleClose}>
                  Cancel
                </button>
              </span>
                            <span>
                <button
                    className={classes.updatebtn}
                    onClick={(editTransactionLable, validateTransaction)}
                >
                  Update
                </button>
              </span>
                        </div>
                    </DialogActions>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.user};
};
export default connect(mapStateToProps, {dispatchAction})(EditTxnLabel);
