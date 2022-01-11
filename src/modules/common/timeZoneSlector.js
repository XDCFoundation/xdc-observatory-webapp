import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "styled-components";
import React from "react";
import timezoneList from "../../assets/timezoneList.json"


const Container = styled.div`
  display: flex;
  width: 50%;
`

const PageSelect = styled(Select)`
  height: ${({height}) => height}px;
  width: 100%;
  color: #ffffff !important;
  background-color: #2149b9;
  border: none;
  margin: 5px 0 0;

  legend {
    float: left;
  }

  fieldset {
    border: none;
  }

  svg {
    color: #ffffff !important;
  }

  ul {
    max-height: 150px;
  }
`
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: -12px;
  margin-right: 4px;
`
const TimeZoneSelector = ({value, handler, height = 35}) => {

    return (
        <Container>
            <PageSelect
                value={value}
                onChange={(event) => handler(event)}
                displayEmpty
                height={height}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: "#2149b9",
                            maxHeight: '150px',
                            color: '#ffffff'
                        }
                    }
                }}
            >
                {timezoneList && Object.keys(timezoneList).map(key =>
                    <MenuItem value={key} key={key}>
                        <Icon src={"/images/utc.svg"}/>{key}</MenuItem>
                )}
            </PageSelect>
        </Container>)
}
export default TimeZoneSelector

