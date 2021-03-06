import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";

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
  ${({ theme }) => theme === "dark" && `
    background: transparent;
    border: solid 1px #3552a5;
  `}

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
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}

  span {
    font-weight: 600;
    color: #252525;
  }
`
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
  ${({ theme }) => theme === "dark" && `
    background: #283966;
    border: solid 1px #3552a5;
    color: #ffffff
  `}

  span {
    padding: 8px;
    cursor: pointer;

    :hover {
      background-color: #F9F9F9;
      ${({ theme }) => theme === "dark" && `
        color: #2a2a2a;
      `}
    }
  }
`
const CustomDropDown = (props) => {
    const {name, options, onSelect, selectedOption} = props
    const [isDropdownOpen, toggleDropdown] = useState(false)
    const mainDiv = useRef(null)

    const selectedOptionData = options ? options.find(data => data.key === selectedOption) : null

    const onOptionSelected = (selected) => {
        onSelect(selected)
        toggleDropdown(false)
    }
    const onFilterClicked = () => {
      if(!isDropdownOpen)
        toggleDropdown(true)
      else
        toggleDropdown(false)
    }

    const handleClickOutside = (event) => {
        if (mainDiv.current && !mainDiv.current.contains(event.target)) {
            toggleDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <Container theme={props.theme} ref={mainDiv}>
            <SelectedValueContainer theme={props.theme} onClick={onFilterClicked}>
                <FilterName theme={props.theme}>
                    <span className={props.theme === "dark" ? "fc-b1c3e1" : ""}>{name || 'Filter'}</span>{selectedOption ? (selectedOptionData.name || selectedOptionData.value) : 'All'}
                </FilterName>
              <img className={props.theme === "dark" ? 'white-dropdown-arrow m-t-8': ""} src={props.theme === "dark" ? "/images/Dropdown.svg" : "/images/dropdown-arrow.svg"}/>
            </SelectedValueContainer>
            {isDropdownOpen &&
            <DropdownContainer theme={props.theme}  containerWidth={mainDiv.current.clientWidth}>
                {options?.map((data, index) => {
                    return (
                        <span className="custom-dropdown-option" key={index}
                              onClick={() => onOptionSelected(data.key)}>{data.value}</span>)
                })}
            </DropdownContainer>}
        </Container>)

}

export default CustomDropDown
