import React from 'react'
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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

  span {
    font-weight: 600;
    color: #252525;
  }
`

const CustomDateDropDown = (props) => {
    const {name, startDate, endDate, isEndDate, onSelect} = props

    return (
        <Container>
            <DatePicker
                selected={isEndDate ? endDate?.toDate() : startDate?.toDate()}
                onChange={(date) => onSelect(moment(date))}
                selectsStart
                startDate={startDate?.toDate()}
                endDate={endDate?.toDate()}
                maxDate={new Date()}
                customInput={
                    <SelectedValueContainer>
                        <FilterName>
                            <span>{name || 'Filter'}</span>{isEndDate ? endDate?.format("D MMM, YYYY") : startDate?.format("D MMM, YYYY") || 'All'}
                        </FilterName>
                    </SelectedValueContainer>}
            />
        </Container>)

}

export default CustomDateDropDown
