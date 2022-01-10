import React from 'react'
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

  input {
    outline: none;
    border: none !important;
  }

  img {
    width: 16px;
    height: 16px;
    margin: 1px 7px 2px 0;
  }
`
const SearchAndFiltersComponent = (props) => {
    return (
        <Container>
            <SearchBox>
                <img src="/images/Search.svg"/>
                <input placeholder="Search"/>
            </SearchBox>
            <CustomDateDropDown name="From" defaultPlaceHolder="1 Dec, 2021"
                                options={[{key: 'account', value: 'Account'},
                                    {key: 'contract', value: 'Contract'}, {key: 'token', value: 'Token'}]}/>
            <CustomDateDropDown name="To" defaultPlaceHolder="15 Dec, 2021"
                                options={[{key: 'account', value: 'Account'},
                                    {key: 'contract', value: 'Contract'}, {key: 'token', value: 'Token'}]}/>
            <CustomDropDown name="Status"
                            options={[{key: 'account', value: 'Account'},
                                {key: 'contract', value: 'Contract'}, {key: 'token', value: 'Token'}]}/>
            <CustomDropDown name="Type"
                            options={[{key: '25', value: '0% - 25%'},
                                {key: '50', value: '25 - 50%'}, {key: '75', value: '50 - 75%'},
                                {key: '100', value: '75 - 100%'}]}/>
        </Container>
    )
}
export default SearchAndFiltersComponent
