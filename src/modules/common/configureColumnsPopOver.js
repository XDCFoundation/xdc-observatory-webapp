import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";
import { SettingsInputComponentTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paperWidthSm: {
    maxWidth: "320px",
    width: "100%",
    borderRadius: "8px",
  },
  customTooltip: {
    fontSize: "13px",
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px",
  },
}));
function ConfigureColumnsPopOver(props) {
  const classes = useStyles();
  const [openTT, setOpenTT] = useState(false);
  const [keyValue, setKeyValue] = useState("");

  const handleOpenTT = (key) => {
    setKeyValue(key);
    setOpenTT(true);
  };

  return (
    <Popover
      classes={{ paperWidthSm: classes.paperWidthSm }}
      open={props.isOpen}
      anchorEl={props.anchorEl}
      onClose={props.handleOnClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div
        className={props.theme === "dark" ? "w-320 table-btn-bg-dark" : "w-320"}
      >
        <div
          className={
            props.theme === "dark"
              ? "fs-16 fw-bold p-t-15 p-b-15 display-flex justify-content-center fc-white"
              : "fs-16 fw-bold p-t-15 p-b-15 display-flex justify-content-center"
          }
        >
          Configure Columns
        </div>
        <div className="margin-0 m-b-15 b-t-1" />
        <div className="p-l-15 p-r-15">
          {props.tableColumns &&
            Object.keys(props.tableColumns).map((key) => {
              if (key !== "Balance")
                return (
                  <div className="display-flex justify-content-between p-b-25">
                    <div className="display-flex">
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          align="right"
                          title={props.tableColumns[key].toolTipText}
                          placement="top"
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            className="tooltipInfoIconConfigDesk"
                            src="/images/info.svg"
                          ></img>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={openTT && key === keyValue}
                          onOpen={() => setOpenTT(true)}
                          onClose={() => setOpenTT(false)}
                          align="right"
                          title={props.tableColumns[key].toolTipText}
                          placement="top"
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            className="tooltipInfoIconConfigDesk"
                            src="/images/info.svg"
                            onClick={() => handleOpenTT(key)}
                          ></img>
                        </Tooltip>
                      )}
                      <div
                        className={
                          props.theme === "dark" ? "p-l-5 fc-white" : "p-l-5"
                        }
                      >
                        {key}
                      </div>
                    </div>
                    <div onClick={() => props.toggleTableColumns(key)}>
                      {props.tableColumns[key].isActive ? (
                        <img className="" src="/images/active-switch.svg" />
                      ) : (
                        <img className="" src="/images/inactive-switch.svg" />
                      )}
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </Popover>
  );
}

export default ConfigureColumnsPopOver;
