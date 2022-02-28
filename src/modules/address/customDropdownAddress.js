import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import format from "format-number";
const Container = styled.div`
  margin-right: 10px;
  @media (max-width: 767px) {
    min-width: 100%;
    margin-left: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;
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
    margin-left: 8px;
  }
`;

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
`;
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  overflow-y: scroll;
  background-color: white;
  max-height: 250px;
  margin-top: 3px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #d4d4d4;
  min-width: ${(props) => props.containerWidth}px;

  span {
    padding: 8px;
    cursor: pointer;

    :hover {
      background-color: #f9f9f9;
    }
  }
`;
const OptionDiv = styled.div`
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
    justify-content: space-between;
  :hover {
    background-color: #f9f9f9;
  }
`;
const TokenName = styled.div``;
const TokenBalance = styled.div``;
const CustomDropDownAddress = (props) => {
  const { name, options, onSelect, selectedOption } = props;
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);
  console.log(options, "options");
  const selectedOptionData = options.length;

  const onOptionSelected = (selected) => {
    onSelect(selected);
    toggleDropdown(false);
  };
  const onFilterClicked = () => {
    toggleDropdown(true);
  };

  const handleClickOutside = (event) => {
    if (mainDiv.current && !mainDiv.current.contains(event.target)) {
      toggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Container ref={mainDiv}>
      <SelectedValueContainer onClick={onFilterClicked}>
        <FilterName>
          <span>{name}</span>
        </FilterName>
        <div>
          <span>{options.length}</span>
          <img src="/images/dropdown-arrow.svg" />
        </div>
      </SelectedValueContainer>
      {isDropdownOpen && (
        <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
          {options?.map((data, index) => {
            return (
              <OptionDiv>
                <TokenName>
                  <a
                    className="options-data"
                    href={`/token-data/${data.address}/${
                      data?.symbol ? data?.symbol : "NA"
                    }`}
                  >
                    {data?.tokenName}
                  </a>
                </TokenName>
                <TokenBalance>{format({})(data.balance)}&nbsp;{data.symbol}</TokenBalance>
              </OptionDiv>
            );
          })}
        </DropdownContainer>
      )}
    </Container>
  );
};

export default CustomDropDownAddress;
