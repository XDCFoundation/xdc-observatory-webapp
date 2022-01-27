import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  griddiv: {
    width: "70vw",
    height: "51vh",
    margin: "10px 220px",
    borderRadius: "12px",
    boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.1)",
    border: "solid 1px #e3e7eb",
    backgroundColor: "#ffffff",
  },
  root: {
    // flexGrow: 1,
    // backgroundColor: "#f8f9fa00",
    // width: "100vw",
    borderRadius: "none",
    padding: "40px 0px",
    justifyContent: "space-around",
  },
  appbar: {
    backgroundColor: "#f8f9fa00",
    marginLeft: "200px",
    borderRadius: "0px",

    width: "90%",
  },
  "@media (max-width: 1920px)": {
    appbar: {
      maxWidth: "1248px",
      width: "100%",
      padding: "0 24px",
    },
  },
  mywatch: {
    /* width: 100px; */
    height: "19px",
    /* margin: 65px 56.5px 10.5px 200px; */
    paddingLeft: "60px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "center",
    color: "#2149b9",
  },
  txnprivate: {
    height: "19px",
    /* margin: 65px 67.5px 10.5px 8.5px; */
    paddingLeft: "30px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "center",
    color: "#6b7482",
  },
  address: {
    height: "19px",
    /* margin: 65px 314px 10.5px 2px; */
    paddingLeft: "30px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "center",
    color: "#6b7482",
  },
}));
export default function Watch() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className={classes.root}>
        {/* <AppBar position="static" className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="My Watchlist"
              onClick={handleClickOpen}
              style={{ color: "#2149b9" }}
              className={classes.mywatch}
              {...a11yProps(0)}
            />
            <Tab
              label="Txn Private Notee"
              className={classes.txnprivate}
              {...a11yProps(1)}
            />
            <Tab
              label="Tagged Adresses"
              className={classes.address}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar> */}
        <TabPanel value={value} index={0}>
          one
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>

      <div className="griddiv">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ border: "none", paddingLeft: "6%" }}
                align="left"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                ></input>
                <span className={"tableheaders"}>Address11</span>
              </TableCell>
              <TableCell
                style={{ border: "none", paddingLeft: "8.5%" }}
                align="left"
              >
                <span className={"tableheaders"}>Descripn</span>
              </TableCell>
              <TableCell
                style={{ border: "none", paddingLeft: "13%" }}
                align="left"
              >
                <span className={"tableheaders"}>Balance</span>
              </TableCell>
              <TableCell
                style={{ border: "none", paddingLeft: "8.5%" }}
                align="left"
              >
                <span className={"tableheaders"}>Added On</span>
              </TableCell>
              <TableCell
                style={{ border: "none", paddingLeft: "6.5%" }}
                align="left"
              >
                <span className={"tableheaders"}>Notification</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* {props.state.transactionList && props.state.transactionList.length && props.state.transactionList.map((row, index) => { */}

            {/* const currentTime = new Date();
                            const previousTime = new Date(row.timestamp * 1000);
                            const ti = timeDiff(currentTime, previousTime);
                            return ( */}
            <TableRow>
              {/* <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input> */}
              <TableCell style={{ border: "none" }} align="left">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                ></input>
                <span className="tabledata">xdcc4e699581116412965b…5e7c</span>
                {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
              </TableCell>
              <TableCell style={{ border: "none" }} align="left">
                <span className="tabledata">My Wallet</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">13,141 XDC ($633.37)</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                {" "}
                <span className="tabledata"> 10:30 AM, 9 Jun 2021</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Off</span>
              </TableCell>
              {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Edit</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }} align="left">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                  style={{ border: "none" }}
                ></input>
                <span className="tabledata">xdcc4e699581116412965b…5e7c</span>
                {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
              </TableCell>
              <TableCell style={{ border: "none" }} align="left">
                <span className="tabledata">JohnB</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">800 XDC ($38.56)</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                {" "}
                <span className="tabledata"> 8:12 PM, 6 Jun 2021</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Email</span>
              </TableCell>
              {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Edit</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }} align="left">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                ></input>
                <span className="tabledata">5e7c71b8e2dd50ac8d30x…5b9c</span>
                {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
              </TableCell>
              <TableCell style={{ border: "none" }} align="left">
                <span className="tabledata">Company</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">621 XDC ($26.50)</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                {" "}
                <span className="tabledata">5:18 PM, 1 Jun 2021</span>
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Email</span>
              </TableCell>
              {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
              <TableCell style={{ border: "none" }} align="right">
                <span className="tabledata">Edit</span>
              </TableCell>
            </TableRow>
            {/* );
                        })} */}
            {/* })} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
