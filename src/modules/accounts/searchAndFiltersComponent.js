import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomDropDown from "../../common/components/customDropdown";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
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
`;
const SearchAndFiltersComponent = (props) => {
  const { searchAndFilters, updateFiltersAndGetAccounts } = props;
  const [searchQuery, setSearchQuery] = useState(searchAndFilters.searchQuery);
  const [type, setType] = useState(searchAndFilters.type);
  const [percentage, setPercentage] = useState(searchAndFilters.percentage);
  let timeoutId = 0;

  useEffect(() => {
    if (!type && !percentage) return;
    updateFiltersAndGetAccounts({ searchQuery, type, percentage });
  }, [type, percentage]);

  const onSearchQueryChange = (value) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearchQuery(value);
      updateFiltersAndGetAccounts({ searchQuery: value, type, percentage });
    }, 500);
  };
  return (
    <Container>
      <SearchBox>
        <img src="/images/Search.svg" alt="search" />
        <input
          placeholder="Search"
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </SearchBox>
      <CustomDropDown
        name="Type"
        selectedOption={type}
        onSelect={(data) => setType(data)}
        options={[
          { key: "0", value: "Account" },
          { key: "1", value: "Contract" },
          { key: "2", value: "Token" },
        ]}
      />
      {/*  <CustomDropDown name="Percentage" selectedOption={percentage} onSelect={data => setPercentage(data)}
                            options={[{key: '25', value: '0% - 25%'},
                                {key: '50', value: '25 - 50%'}, {key: '75', value: '50 - 75%'},
                                {key: '100', value: '75 - 100%'}]}/>*/}
    </Container>
  );
};
export default SearchAndFiltersComponent;
