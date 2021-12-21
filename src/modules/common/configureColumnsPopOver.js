import React from "react";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";

function ConfigureColumnsPopOver(props) {
    return (<Popover
        open={props.isOpen}
        anchorEl={props.anchorEl}
        onClose={props.handleOnClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
        <div className="w-320">
            <div className="fs-16 fw-bold p-t-15 p-b-15 display-flex justify-content-center">Configure Columns</div>
            <hr className="margin-0 m-b-15"/>
            <div>
                {
                    props.tableColumns && Object.keys(props.tableColumns).map(key => {
                      return (
                          <div className="display-flex justify-content-between p-b-25 p-l-10 p-r-10">
                              <div className="display-flex">
                                  <Tooltip align="right" title={props.tableColumns[key].toolTipText}>
                                      <img className="w-16-px h-16 m-t-2" src="/images/question_mark_tooltip.svg"></img>
                                  </Tooltip>
                                  <div className="p-l-5">{key}</div>
                              </div>
                              <div onClick={()=>props.toggleTableColumns(key)}>
                                  {props.tableColumns[key].isActive ? <img className="" src="/images/active-switch.svg"/> :
                                  <img className="" src="/images/inactive-switch.svg"/>}
                              </div>
                          </div>
                      )
                    })
                }
            </div>
        </div>
    </Popover>)
}

export default ConfigureColumnsPopOver;