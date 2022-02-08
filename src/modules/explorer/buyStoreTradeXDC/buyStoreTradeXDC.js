import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1202px;
  width: 100%;
  margin: 0 auto;
  padding: 15px 0;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 1240px) {
    display: block;
    max-width: 694px;
    width: 100%;
    padding-top: 0;
    padding-left: 15px;
    padding-right: 15px;
  }
`;
const BuyStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  align-items: center;
  @media (min-width: 0px) and (max-width: 1240px) {
    border-top: 1px solid #e3e7eb;
  }
`;
const ImgContainer = styled.div`
  margin-bottom: 20px;
`;
const ContentContainer = styled.div`
  padding: 0 34px;
  width: 75%;
  text-align: center;
`;
const Heading = styled.div`
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  color: #2a2a2a;
  text-align: center;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-family: Inter;
  font-size: 14px;
  color: #2a2a2a;
  margin-top: 11px;
  margin-bottom: 27px;
`;
const Button = styled.div`
  // padding: 10px 16px 9px 19px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  background-color: #4878ff;
  width: 140px;
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  // @media (min-width: 0px) and (max-width: 1240px) {
  //     padding: 6px 16px 5px 18px;
  // }
`;
const VerticalLine = styled.div`
  border-right: 1px solid #e3e7eb;
  margin-left: 34px;
  margin-right: 34px;
  @media (min-width: 0px) and (max-width: 1240px) {
    border: none;
    margin-left: 0;
    margin-right: 0;
  }
`;
const TradeContainer = styled.div`
  display: flex;
  padding: 20px 0;
  @media (min-width: 0px) and (max-width: 1240px) {
    border-top: 1px solid #e3e7eb;
  }
`;
const IconContainer = styled.div`
  display: flex;
`;
const CoinImg = styled.div`
  margin-right: 11px;
`;

function BuyStoreTradeXDC() {
  return (
    <MainContainer>
      <BuyStoreContainer>
        <Heading>Buy and Store XDC</Heading>
        <ImgContainer>
          <img src="/images/buy-store.svg" alt="buy-store-img" />
        </ImgContainer>
        <ContentContainer>
          <Description>
            Install our secure XDCPay Extension to Buy, Send and Store XDC and
            other Network Tokens.
          </Description>
          <div className="display-flex justify-content-center">
            <a
              href="https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo?hl=en-GB"
              target="_blank"
            >
              <Button>Create Wallet</Button>
            </a>
          </div>
        </ContentContainer>
      </BuyStoreContainer>
      {/* <VerticalLine />
            <TradeContainer>
                <ImgContainer>
                    <img src='/images/exchange.svg' alt='exchange-img' />
                </ImgContainer>
                <ContentContainer>
                    <Heading>
                        Trade XDC
                    </Heading>
                    <Description>
                        XDC can be exchanged with other cryptocurrencies through the exchanges listed here
                    </Description>
                    <IconContainer>
                        <CoinImg><a href='https://trade.kucoin.com/trade/XDC-USDT' target='_blank'><img src='/images/ku-coin.svg' alt='ku-coin-img' /></a></CoinImg>
                        <CoinImg><a href='https://www.gate.io/trade/xdc_usdt' target='_blank'><img src='/images/gate.svg' alt='gate-img' /></a></CoinImg>
                        <CoinImg><a href='https://indodax.com/market/XDCIDR' target='_blank'><img src='/images/indodax.svg' alt='indodax-img' /></a></CoinImg>
                        <CoinImg><a href='https://mercatox.com/exchange/XDC/BTC' target='_blank'><img src='/images/mercatox.svg' alt='mercatox-img' /></a></CoinImg>
                    </IconContainer>
                </ContentContainer>
            </TradeContainer> */}
    </MainContainer>
  );
}

export default BuyStoreTradeXDC;
