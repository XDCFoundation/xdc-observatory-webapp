import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import CustomDropDown from "../../common/components/customDropdown";

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
    width: 100%;
    margin-right: 0;
  }

`
const SearchAndFiltersComponent = (props) => {
    const {searchAndFilters, updateFiltersAndGetAccounts} = props
    const [searchQuery, setSearchQuery] = useState(searchAndFilters.searchQuery)
    const [age, setAge] = useState(searchAndFilters.age)
    let timeoutId = 0

    useEffect(() => {
        if (!age)
            return
        updateFiltersAndGetAccounts({searchQuery, age})
    }, [age])

    const onSearchQueryChange = (value) => {
        if (timeoutId)
            clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setSearchQuery(value)
            updateFiltersAndGetAccounts({searchQuery: value, age})
        }, 500)
    }
    return (
        <Container>
            <SearchBox>
                <img src="/images/Search.svg" alt="search"/>
                <input placeholder="Search" onChange={e => onSearchQueryChange(e.target.value)}/>
            </SearchBox>
            <CustomDropDown name="Age" selectedOption={age} onSelect={data => setAge(data)}
                            options={[
                                {key: "all", value: 'All Time'},
                                {key: "1d", value: 'In Last 1d'}, {key: "1m", value: 'In Last 1M'},
                                {key: "6m", value: 'In Last 6M'}, {key: "1y", value: 'In Last 1Y'}
                            ]}/>
        </Container>
    )
}
export default SearchAndFiltersComponent
