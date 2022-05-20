import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import format from "format-number";
import Utility from "../../utility";

const Container = styled.div`
  margin-right: 0px;
  width: 320px;

  @media (max-width: 767px) {
    min-width: 100%;
    margin-left: 0;
    margin-top: 4px;
    margin-bottom: 4px;
    width: 180px;
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
  ${({ theme }) =>
    theme === "dark" &&
    `
    background: transparent;
    border: solid 1px #3552a5;
  `}
`;

const FilterName = styled.div`
  width: 15px;
  height: 15px;
  margin: 7px 0px 7px 4px;
  border-radius: 3px;
  background-color: #253ec1;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 500;
    color: #fff;
    font-size: 10px;
  }
`;
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
  max-height: 347px;
  padding-bottom: 10px;
  ${({ theme }) =>
    theme === "dark" &&
    `
    background: #283966;
    border: solid 1px #3552a5;
    color: #ffffff;
  `}
  span {
    padding: 8px;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    max-width: 180px;
    padding-right: 5px;
  }
`;
const SearchBox = styled.div`
  border-radius: 4px;
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  min-width: 311px;
  height: 34px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  margin: 6px 3px;
  ${({ theme }) =>
    theme === "dark" &&
    `
    background: #091b4e;
    border: solid 1px #3552a5;
  `}
  input {
    outline: none;
    border: none !important;
    ${({ theme }) =>
      theme === "dark" &&
      `
    background: #091b4e;
    color: #ffffff;
  `}
  }

  img {
    width: 16px;
    height: 16px;
    margin: 1px 7px 2px 0;
  }

  @media (max-width: 767px) {
    min-width: 100%;
    margin-right: 0;
    input {
      outline: none;
      border: none !important;
      width: 136px;
    }
  }
`;
const TokenBalanceContainer = styled.div`
  display: flex;
`;
const OptionDiv = styled.div`
  padding: 6px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #ffffff;
  `}
  :hover {
    background-color: #3763dd;
    color: #fff !important;
  }
  @media (max-width: 767px) {
    display: block;
  }
`;
const TokenName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;
const TokenBalance = styled.div`
  font-size: 13px;
  opacity: 0.8;
`;
const TokenHeading = styled.div`
  min-width: 311px;
  height: 33px;
  margin-left: 4px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  padding-left: 4px;
  ${({ theme }) =>
    theme === "dark" &&
    `
    background: #091b4e;
  `}
  span {
    font-size: 14px;
    font-weight: 600;
    color: #2a2a2a;
    ${({ theme }) =>
      theme === "dark" &&
      `
    color: #ffffff;
  `}
  }
  @media (max-width: 767px) {
    min-width: fit-content;
  }
`;
const TokenLogo = styled.div``;
const SecondColumnToken = styled.div`
  display: flex;
  flex-direction: column;
`;
const TokenUsdBalance = styled.div``;
const FirstColumnToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const LastLine = styled.div`
  margin: 0 auto;
  min-width: 311px;
  border: solid 0.5px #e3e7eb;
  ${({ theme }) =>
    theme === "dark" &&
    `
    border: solid 0.5px #3552a5;
  `}
  @media (max-width: 767px) {
    min-width: fit-content;
  }
`;
const CustomDropDownAddress = (props) => {
  const { price, options, onSelect } = props;
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isPriceVisibilty, setPriceVisibilty] = useState(false);
  const [priceConvertedValue, setPriceConvertedValue] = useState(false);

  const onOptionSelected = (selected) => {
    onSelect(selected);
    toggleDropdown(false);
  };
  const onFilterClicked = () => {
    if (isDropdownOpen) toggleDropdown(false);
    else toggleDropdown(true);
  };

  const handleClickOutside = (event) => {
    if (mainDiv.current && !mainDiv.current.contains(event.target)) {
      toggleDropdown(false);
      setSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  useEffect(() => {
    setFilteredData(
      options.filter((data) => {
        return data.tokenName
          .toLocaleLowerCase()
          .includes(search?.toLocaleLowerCase());
      })
    );
  }, [search, options]);
  let filterXrc20 = options?.filter((obj) => !obj.ERC || obj.ERC == 2);
  let filterXrc721 = options.filter((obj) => obj.ERC > 2);

  let activeCurrency = props.activeCurrency;
  const currencySymbol = !price ? "" : activeCurrency === "USD" ? "$" : "€";

  function MouseOver(price) {
    setPriceConvertedValue(price);
    setPriceVisibilty(true);
  }
  function MouseOut(event) {
    event.target.style.background = "";
    setPriceVisibilty(false);
  }

  return (
    <Container ref={mainDiv}>
      <SelectedValueContainer theme={props.theme} onClick={onFilterClicked}>
        <TokenBalanceContainer>
          {isPriceVisibilty && (
            <TokenUsdBalance>
              {currencySymbol}
              {Number(priceConvertedValue).toFixed(2)}
            </TokenUsdBalance>
          )}
          <FilterName>
            <span>{options.length}</span>
          </FilterName>
        </TokenBalanceContainer>
        <div>
          <img
            className={
              isDropdownOpen
                ? "arrow-rotate-animation-up"
                : "arrow-rotate-animation-down"
            }
            src={
              props.theme === "dark"
                ? "/images/Dropdown.svg"
                : "/images/dropdown-arrow.svg"
            }
          />
        </div>
      </SelectedValueContainer>
      {isDropdownOpen && search.length == 0 ? (
        <DropdownContainer
          theme={props.theme}
          containerWidth={mainDiv.current.clientWidth}
        >
          <SearchBox theme={props.theme}>
            <img src="/images/Search.svg" />
            <input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
          <TokenHeading theme={props.theme}>
            <span>XRC-20 Token ({filterXrc20.length})</span>
          </TokenHeading>
          {filterXrc20?.map((data, index) => {
            let px = data.balance * price;
            let balance = !price
              ? ""
              : Utility.divideByDecimalValue(data.balance, data?.decimals);
            let priceConverted = !price
              ? ""
              : Utility.divideByDecimalValue(px, data?.decimals);
            // setPriceConvertedValue(priceConverted)
            return (
              <a
                className="options-data"
                href={`/token-data/${data.address}/${
                  data?.symbol ? data?.symbol : "NA"
                }`}
              >
                <OptionDiv
                  theme={props.theme}
                  onMouseOver={() => MouseOver(priceConverted)}
                  onMouseOut={MouseOut}
                >
                  <FirstColumnToken>
                    <TokenLogo>
                      {data?.tokenImage ? (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={data?.tokenImage}
                        ></img>
                      ) : (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={"/images/XRC20-Icon.svg"}
                        ></img>
                      )}
                    </TokenLogo>
                    <SecondColumnToken>
                      <TokenName>
                        {data?.tokenName ? data?.tokenName : "NA"}
                      </TokenName>

                      <TokenBalance>
                        {Number(balance).toFixed(2)}
                        &nbsp;{data.tokenName}
                      </TokenBalance>
                    </SecondColumnToken>
                  </FirstColumnToken>
                  <TokenUsdBalance>
                    {currencySymbol}
                    {Number(priceConverted).toFixed(2)}
                  </TokenUsdBalance>
                </OptionDiv>
              </a>
            );
          })}
          <TokenHeading theme={props.theme}>
            <span>XRC-721 Token ({filterXrc721.length})</span>
          </TokenHeading>
          {filterXrc721?.map((data, index) => {
            let px = data.balance * price;
            let balance = !price
              ? ""
              : Utility.divideByDecimalValue(data.balance, data?.decimals);
            let priceConverted = !price
              ? ""
              : Utility.divideByDecimalValue(px, data?.decimals);
            return (
              <a
                className="options-data"
                href={`/token-data/${data.address}/${
                  data?.symbol ? data?.symbol : "NA"
                }`}
              >
                <OptionDiv
                  theme={props.theme}
                  onMouseOver={() => MouseOver(priceConverted)}
                  onMouseOut={MouseOut}
                >
                  <FirstColumnToken>
                    <TokenLogo>
                      {data?.tokenImage ? (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={data?.tokenImage}
                        ></img>
                      ) : (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={"/images/XRC20-Icon.svg"}
                        ></img>
                      )}
                    </TokenLogo>
                    <SecondColumnToken>
                      <TokenName>
                        {data?.tokenName ? data?.tokenName : "NA"}
                      </TokenName>

                      <TokenBalance>
                        {Number(balance).toFixed(2)}&nbsp;{data.symbol}
                      </TokenBalance>
                    </SecondColumnToken>
                  </FirstColumnToken>
                  <TokenUsdBalance>
                    {currencySymbol}
                    {Number(priceConverted).toFixed(2)}
                  </TokenUsdBalance>
                </OptionDiv>
              </a>
            );
          })}
          <LastLine theme={props.theme}></LastLine>
        </DropdownContainer>
      ) : (
        isDropdownOpen && (
          <DropdownContainer
            theme={props.theme}
            containerWidth={mainDiv.current.clientWidth}
          >
            <SearchBox theme={props.theme}>
              <img src="/images/Search.svg" />
              <input
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
            {filteredData?.map((data, index) => {
              let px = data.balance * price;
              let balance = !price
                ? ""
                : Utility.divideByDecimalValue(data.balance, data?.decimals);
              let priceConverted = !price
                ? ""
                : Utility.divideByDecimalValue(px, data?.decimals);
              return (
                <a
                  className="options-data"
                  href={`/token-data/${data.address}/${
                    data?.symbol ? data?.symbol : "NA"
                  }`}
                >
                  <OptionDiv
                    theme={props.theme}
                    onMouseOver={() => MouseOver(priceConverted)}
                    onMouseOut={MouseOut}
                  >
                    <FirstColumnToken>
                      <TokenLogo>
                        {data?.tokenImage ? (
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src={data?.tokenImage}
                          ></img>
                        ) : (
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src={"/images/XRC20-Icon.svg"}
                          ></img>
                        )}
                      </TokenLogo>
                      <SecondColumnToken>
                        <TokenName>
                          {data?.tokenName ? data?.tokenName : "NA"}
                        </TokenName>

                        <TokenBalance>
                          {Number(balance).toFixed(2)}&nbsp;{data.symbol}
                        </TokenBalance>
                      </SecondColumnToken>
                    </FirstColumnToken>
                    <TokenUsdBalance>
                      {currencySymbol}
                      {Number(priceConverted).toFixed(2)}
                    </TokenUsdBalance>
                  </OptionDiv>
                </a>
              );
            })}
          </DropdownContainer>
        )
      )}
    </Container>
  );
};

export default CustomDropDownAddress;
