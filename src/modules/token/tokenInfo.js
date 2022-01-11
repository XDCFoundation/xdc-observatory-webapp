import React from "react";
import styled from "styled-components";
import { AccountService } from "../../services";
import utility from "../../utility";
import { useParams } from "react-router-dom";

const TitleText = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #6c757e;
  line-height: 1.7;
  margin: 15px 0 0 0;
`;

const TokenOverView = styled.div`
  font-size: 15px;
  line-height: 1.7;
  margin: 10px 0 0 0;
`;

const MarketDataTable = styled.table`
  font-size: 15px;
  line-height: 1.7;
  margin: 10px 0 0 0;
`;

const MarketDataTitleCol = styled.td`
  font-size: 15px;
  width: 170px;
  line-height: 1.7;
`;

const ParentContainer = styled.div`
  padding: 10px 15px 15px 15px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 14px;
`;

const DataSourceLink = styled.a`
  :hover {
    text-decoration: none;
    color: #2149b9;
    font-size: 15px;
  }

  margin: 0 0 0 5px;
  font-size: 15px;
  color: #2149b9;
`;

export default function TokenInfo(props) {
  const { tn } = useParams();
  const [tokenInfo, setTokenInfo] = React.useState({});
  React.useEffect(() => {
    getTokenInfo();
  }, []);

  const getTokenInfo = async () => {
    let [error, response] = await utility.parseResponse(
      AccountService.getTokenInfo(tn)
    );

    if (error || !response) {
      setTokenInfo({});
    }
    setTokenInfo(response ? response : {});
  };

  const quote =
    tokenInfo &&
    Object.keys(tokenInfo) &&
    tokenInfo.quote &&
    tokenInfo.quote["USD"]
      ? tokenInfo.quote["USD"]
      : {};

  return (
    <ParentContainer>
      <TitleText>Overview</TitleText>
      <TokenOverView>
        {tokenInfo.name
          ? `${tokenInfo.name} ${
              tokenInfo.symbol ? `(${tokenInfo.symbol})` : ""
            }`
          : ""}
      </TokenOverView>
      <TitleText>Market</TitleText>
      <MarketDataTable>
        <tbody>
          <tr>
            <MarketDataTitleCol>Volume (24H)</MarketDataTitleCol>
            <td>{`: ${quote.volume_24h ? `$${quote.volume_24h}` : "0"}`}</td>
          </tr>
          <tr>
            <MarketDataTitleCol>Market Capitalization</MarketDataTitleCol>
            <td>{`: ${quote.market_cap ? `$${quote.market_cap}` : "0"}`}</td>
          </tr>
          <tr>
            <MarketDataTitleCol>Circulating Supply</MarketDataTitleCol>
            <td>{`: ${
              tokenInfo.circulatingSupply
                ? `${tokenInfo.circulatingSupply}`
                : "0"
            } ${tn}`}</td>
          </tr>
          <tr>
            <MarketDataTitleCol>Market Data Source</MarketDataTitleCol>
            <td>
              :
              <DataSourceLink href="https://coinmarketcap.com/" target="_blank">
                Coinmarketcap
              </DataSourceLink>
            </td>
          </tr>
        </tbody>
      </MarketDataTable>
    </ParentContainer>
  );
}
