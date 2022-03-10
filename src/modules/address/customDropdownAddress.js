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
  width: 15px;
  height: 15px;
  margin: 7px 230px 7px 4px;
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
  span {
    padding: 8px;
    cursor: pointer;
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
`;
const OptionDiv = styled.div`
  padding: 6px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    background-color: #3763dd;
    color: #fff !important;
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

  span {
    font-size: 14px;
    font-weight: 600;
    color: #2a2a2a;
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
`;
const CustomDropDownAddress = (props) => {
  const { price, options, onSelect } = props;
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);
  const [search, setSearch] = useState("");
  console.log(search, "lolo");
  const [filteredData, setFilteredData] = useState([]);
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

  let activeCurrency = window.localStorage.getItem("currency");
  const currencySymbol = !price ? "" : activeCurrency === "USD" ? "$" : "€";

  return (
    <Container ref={mainDiv}>
      <SelectedValueContainer onClick={onFilterClicked}>
        <FilterName>
          <span>{options.length}</span>
        </FilterName>
        <div>
          <img
            className={
              isDropdownOpen
                ? "arrow-rotate-animation-up"
                : "arrow-rotate-animation-down"
            }
            src="/images/dropdown-arrow.svg"
          />
        </div>
      </SelectedValueContainer>
      {isDropdownOpen && search.length == 0 ? (
        <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
          <SearchBox>
            <img src="/images/Search.svg" />
            <input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
          <TokenHeading>
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
            return (
              <a
                className="options-data"
                href={`/token-data/${data.tokenContract}/${
                  data?.symbol ? data?.symbol : "NA"
                }`}
              >
                <OptionDiv>
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
                        {format({})(balance)}&nbsp;{data.tokenName}
                      </TokenBalance>
                    </SecondColumnToken>
                  </FirstColumnToken>
                  <TokenUsdBalance>
                    {currencySymbol}
                    {priceConverted}
                  </TokenUsdBalance>
                </OptionDiv>
              </a>
            );
          })}
          <TokenHeading>
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
                href={`/token-data/${data.tokenContract}/${
                  data?.symbol ? data?.symbol : "NA"
                }`}
              >
                <OptionDiv>
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
                        {format({})(balance)}&nbsp;{data.symbol}
                      </TokenBalance>
                    </SecondColumnToken>
                  </FirstColumnToken>
                  <TokenUsdBalance>
                    {currencySymbol}
                    {priceConverted}
                  </TokenUsdBalance>
                </OptionDiv>
              </a>
            );
          })}
          <LastLine></LastLine>
        </DropdownContainer>
      ) : (
        isDropdownOpen && (
          <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
            <SearchBox>
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
                  href={`/token-data/${data.tokenContract}/${
                    data?.symbol ? data?.symbol : "NA"
                  }`}
                >
                  <OptionDiv>
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
                          {format({})(balance)}&nbsp;{data.symbol}
                        </TokenBalance>
                      </SecondColumnToken>
                    </FirstColumnToken>
                    <TokenUsdBalance>
                      {currencySymbol}
                      {priceConverted}
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
