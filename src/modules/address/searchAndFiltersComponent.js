import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CustomDropDown from "../../common/components/customDropdown";
import CustomDateDropDown from "../../common/components/customDateDropdown";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`
const SearchBox = styled.div`
  border-radius: 8px;
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  padding: 7px 10px;
  margin-bottom: 4px;
  margin-right: 10px;

  input {
    outline: none;
    border: none !important;
  }

  img {
    width: 16px;
    height: 16px;
    margin: 1px 7px 2px 0;
  }

  @media (max-width: 767px) {
    min-width: 100%;
    margin-right: 0;
  }
`
const SearchAndFiltersComponent = (props) => {
    const { searchAndFilters, updateFiltersAndGetAccounts } = props
    const [searchQuery, setSearchQuery] = useState(searchAndFilters.searchQuery)
    const [startDate, setStartDate] = useState(searchAndFilters.startDate)
    const [endDate, setEndDate] = useState(searchAndFilters.endDate)
    const [type, setType] = useState(searchAndFilters.type)
    const [status, setStatus] = useState(searchAndFilters.status)
    let timeoutId = 0

    useEffect(() => {
        if (!type && !status)
            return
        updateFiltersAndGetAccounts({ searchQuery, type, status, endDate, startDate })
    }, [type, status])

    useEffect(() => {
        setStartDate(searchAndFilters.startDate)
    }, [searchAndFilters.startDate])

    const onSearchQueryChange = (value) => {
        if (timeoutId)
            clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setSearchQuery(value)
            updateFiltersAndGetAccounts({ searchQuery: value, type, status })
        }, 500)
    }

    const onStartDateUpdated = (value) => {
        setStartDate(value)
        // updateFiltersAndGetAccounts({searchQuery, type, status, endDate, startDate: value})
    }

    const onEndDateUpdated = (value) => {
        setEndDate(value)
        updateFiltersAndGetAccounts({ searchQuery, type, status, startDate, endDate: value })
    }

    return (
        <Container>
            <SearchBox>
                <img src="/images/Search.svg" />
                <input placeholder="Search" onChange={e => onSearchQueryChange(e.target.value)} />
            </SearchBox>
            {/*<CustomDateDropDown name="Date" setStartDates={onStartDateUpdated} setEndDates={onEndDateUpdated}
                                startDate={startDate} endDate={endDate}/>*/}
            <CustomDropDown name="Status" selectedOption={status} onSelect={data => setStatus(data)}
                options={[{ key: 'all', value: 'Show All Txns', name: 'All' },
                { key: 'true', value: 'Show Completed Txns', name: 'Completed Txns' },
                { key: 'false', value: 'Show Failed Txns', name: 'Failed Txns' }]} />
            <CustomDropDown name="Type" selectedOption={type} onSelect={data => setType(data)}
                options={[{ key: 'ALL', value: 'All Txns', name: 'All' }, { key: 'IN', value: 'In Txns' },
                { key: 'OUT', value: 'Out Txns' }]} />
        </Container>
    )
}
export default SearchAndFiltersComponent
