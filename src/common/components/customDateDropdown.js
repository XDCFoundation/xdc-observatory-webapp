import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import moment from "moment";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import {messages} from "../../constants";
import Tooltip from "@material-ui/core/Tooltip";

const Container = styled.div`
  margin-right: 10px;

  @media (max-width: 767px) {
    min-width: 100%;
    margin-left: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
`
const SelectedValueContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  border: solid 1px #e3e7eb;
  background: white;
  padding: 7px 10px;

  img {
    width: 11px;
    margin-left: 8px
  }
`

const FilterName = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: 500;
  color: #585858;
  gap: 25px;
  align-items: center;

  span {
    font-weight: 600;
    color: #252525;
  }

  img {
    width: 15px;
    margin-left: 2px;
  }
`

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  overflow-y: scroll;
  background-color: white;
  margin-top: 3px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #d4d4d4;
  min-width: ${(props) => props.containerWidth}px;

  span {
    margin: 5px 0;
    cursor: pointer;
  }
`
const CustomDateDropDown = (props) => {
    const {name, startDate, endDate, setStartDates, setEndDates} = props
    const [isDropdownOpen, toggleDropdown] = useState(false)
    const mainDiv = useRef(null)

    const handleClickOutside = (event) => {
        if (mainDiv.current && !mainDiv.current.contains(event.target)) {
            toggleDropdown(false);
        }
    };
    const onFilterClicked = () => {
        toggleDropdown(true)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return (
        <Container ref={mainDiv}>
            <SelectedValueContainer onClick={onFilterClicked}>
                <FilterName>
                        <span>{name || 'Filter'}<Tooltip placement="top" title={messages.DATE}>
                            <img
                                alt="question-mark"
                                src="/images/info-new.svg"
                            />
                        </Tooltip>
                        </span>
                    {startDate && startDate.format("D MMM, YYYY") !== endDate.format("D MMM, YYYY") ? `${startDate.format("D MMM, YYYY")} - ${endDate && endDate.format("D MMM, YYYY")}` : 'All'}
                </FilterName>
                <img src="/images/dropdown-arrow.svg"/>
            </SelectedValueContainer>

            {isDropdownOpen &&
            <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
                <DateRange
                    onChange={item => {
                        setStartDates(moment(item.selection.startDate))
                        setEndDates(moment(item.selection.endDate))
                        toggleDropdown(false);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={[{
                        startDate: startDate.toDate(),
                        endDate: endDate.toDate(),
                        key: 'selection'
                    }]}
                />
            </DropdownContainer>}
        </Container>)

}

export default CustomDateDropDown
