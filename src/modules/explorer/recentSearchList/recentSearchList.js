import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {eventConstants} from "../../../constants";
import Utility from "../../../utility";
import Carousel from "../../common/carousel/carousel";
import useWindowDimensions from "../../common/useWindowDimensions";
import {history} from "../../../managers/history";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`
const MainContainer = styled(Column)`
  margin: 30px auto;
  //border-radius: 12px;
  //box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  //border: solid 1px #e3e7eb;
  border-top: solid 1px #e3e7eb;
  background-color: #ffffff;
  padding: 20px 1px 16px 25px;
  width: 75.125rem;
  @media (min-width: 767px) and (max-width: 1240px) {
    width: 41.5rem;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    width: 21rem;
  }
`
const TitleRow = styled(Row)`
  align-items: center;

`
const Title = styled.span`
  margin: 0 11px 0 0;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  //letter-spacing: 0.69px;
  color: #2a2a2a;
`
const ClearText = styled.span`
  font-family: Inter-Regular_;
  font-size: 14px;
  font-weight: 500;
  //letter-spacing: 0.54px;
  color: #f00;
  padding-left: 11px;
  cursor: pointer;
`
const Wrapper = styled(Row)`
  margin: 19px 0 10px 0;
  gap: 22px;
  flex-wrap: wrap;
`
const SearchTypeIcon = styled.img`
  //width: 18px;
  height: 24px;
`
const SearchValue = styled.span`
  width: 153px;
  height: 17px;
  margin: 0 8px 5px 11px;
  font-family: Inter;
  font-size: 14px;
  //letter-spacing: 0.54px;
  color: #2149b9;
`
const ResultValue = styled.span`
  margin: 0 0 4px 11px;
  font-family: Inter-Regular_;
  font-size: 12px;
  font-weight: 600;
  //letter-spacing: 0.46px;
  color: #2149b9;
`
const RedirectIcon = styled.img`
  width: 8px;
  height: 9px;
  position: absolute;
  right: 12px;
  bottom: 5px;
  cursor: pointer;
`
const ActiveRedirectIcon = styled.img`
  width: 8px;
  height: 9px;
  position: absolute;
  right: 12px;
  bottom: 5px;
  cursor: pointer;
  display: none;
`

const ItemContainer = styled(Column)`
  width: 229px;
  height: 58px;
  padding: 11px 9px 6px 14px;
  border-radius: 8px;
  border: solid 1px #c9d7ff;
  background-color: transparent;
  cursor: pointer;
  margin-right: 22px;

  &:hover {
    background-color: #fbfcff;
  }

  &:hover ${RedirectIcon} {
    display: none;
  }

  &:hover ${ActiveRedirectIcon} {
    display: block;
  }
`
const TextContainer = styled(Column)`
  width: 100%;
  position: relative;
`
const NotFoundContainer = styled(Row)`
  width: 100%;
  justify-content: center;
`

const RecentSearchList = () => {
    const dispatch = useDispatch();
    const {height, width} = useWindowDimensions();

    const dataList = useSelector((state) => state.recentSearchList);

    function clearHandler() {
        dispatch({type: eventConstants.CLEAR_SEARCH_LIST, payload: null})
    }

    return (<MainContainer>
        <TitleRow><Title>{'Recent Searches'}</Title>
            <ClearText onClick={() => clearHandler()}>{'Clear'}</ClearText>
        </TitleRow>
        <Wrapper>
            {dataList?.length >0 &&
            <Carousel show={width < 768 && 1 || width >= 768 && width < 1280 && 2 || width >= 1280 && 3}>
                {dataList?.length > 0 && dataList.map((obj, index) => <ItemContainer key={index}>
                    <Row style={{alignItems: 'center'}}>
                        <SearchTypeIcon src={recentSearchIconConstants[obj.type]} alt={'icon'}/>
                        <TextContainer onClick={() => {
                            window.location.href = obj.redirectUrl
                            // history.push(obj.redirectUrl)
                        }}>
                            <SearchValue>{shorten(obj.searchValue)}</SearchValue>
                            <ResultValue>{getAmount(obj.result)}</ResultValue>
                            <RedirectIcon src={'/images/up-arrow-recent-search.svg'}/>
                            <ActiveRedirectIcon src={'/images/up-arrow-active-recent-search.svg'}/>
                        </TextContainer>
                    </Row>
                </ItemContainer>)}
            </Carousel>
            ||<NotFoundContainer className="not-found">No Recent Search Found</NotFoundContainer>}
        </Wrapper>
    </MainContainer>)

}

const recentSearchIconConstants = {
    TRANSACTION: '/images/transaction-recent-search.svg',
    TOKEN: '/images/contract-recent-search.svg',
    WALLET: '/images/wallet-recent-search.svg',
}


function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    if (!b || b.length < 10)
        return b || ''
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
        b.length - 3,
        b.length
    )}`;
}

function getAmount(amount) {
    let amt = Utility.decimalDivison(amount, 6);
    let amt1 = amt?.toString()?.split(".")[0]
    let amt2 = amt?.toString()?.split(".")[1]
    return `${amt2 ? `${amt1}.${amt2}` : `${amt1}`} XDC`
}

export default RecentSearchList