import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../../assets/styles/custom.css";
import AddressPDF from "../../common/components/tagAddressPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";

const Container = styled.div`
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
  cursor: pointer;
  background: white;
  padding: 3px 10px;
  background-color: rgb(7 125 245);
  border-radius: 0.25rem;
  width: 5.875rem;
  height: 2.125rem;
  justify-content: center;

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
  color: #fff;
  gap: 25px;

  span {
    font-weight: 500;
    color: #fff;
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
  border-radius: 8px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  min-width: ${(props) => props.containerWidth}px;
@media (min-width:0px) and (max-width:767px) {
  right: 15px;
  
}
  span {
    padding: 8px;
    cursor: pointer;

    :hover {
      background-color: #f9f9f9;
    }
  }
`;
const OptionDiv = styled.div`
  padding: 3px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    background-color: #f9f9f9;
  }
`;
const OptionsContainer = styled.div`
  display: flex;
`;
const Image = styled.img`
  margin-right: 2px;
`;
const OptionText = styled.span`
   font-size: 14px;
   color: #2a2a2a;
`;

const ExportButton = (props) => {
  const { downloadData } = props;
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);

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
    <div>
      <Container ref={mainDiv}>
        <SelectedValueContainer onClick={onFilterClicked}>
          <FilterName>
          <PDFDownloadLink
                
                document={<AddressPDF data={downloadData} />}
                fileName="Tag Address.pdf"
              >
            <span>Export</span>
            </PDFDownloadLink>
          </FilterName>
        </SelectedValueContainer>
        {/* {isDropdownOpen && (
          <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
            <OptionDiv>
              <PDFDownloadLink
                
                document={<AddressPDF data={downloadData} />}
                fileName="tagAddresses.pdf"
              >
                <OptionsContainer onClick={() => toggleDropdown(false)}>
                  <Image src="/images/pdf.svg" />
                  <OptionText>Export as PDF</OptionText>
                </OptionsContainer>
              </PDFDownloadLink>
              
            </OptionDiv>
            <OptionDiv>
            <CSVLink filename={"tag_address.csv"} data={downloadData}>
              <OptionsContainer onClick={() =>toggleDropdown(false)}>
                <Image src="/images/csv.svg" />
                <OptionText>Export as CSV File</OptionText>
              </OptionsContainer>
            </CSVLink>
            </OptionDiv>
          </DropdownContainer>
        )} */}
      </Container>
    </div>
  );
};

export default ExportButton;
