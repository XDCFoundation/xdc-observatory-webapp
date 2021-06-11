import React from "react";
// import { Row } from 'simple-flexbox'
import "../../assets/styles/custom.css";
import styled, { css } from "styled-components";

const MainContainer = styled.div`
  width: 850px;
  height: 250px;
  margin: 0 auto;
  margin-top: 76px;
  padding: 26px 9px 22px 25px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
`;
const LeftContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  flex: 0.5;
  display: flex;
`;
const LeftFirst = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 2px;
`;
const LeftSec = styled.div`
  flex: 0.7;
`;
const ValueMain = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-item: center;
`;

const Value = styled.div`
  display: flex;
  align-item: center;
`;

const ValueName = styled.div``;

export default function BlockChainDataComponent() {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftFirst>
          <h1>XDC</h1>
          <h2>1251</h2>
        </LeftFirst>

        <LeftSec>
          <ValueMain>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
            <Value>
              <h1>1</h1>
              <ValueName>
                <p style={{ marginBottom: "-3px" }}>Block Height</p>
                <p>30,080,29</p>
              </ValueName>
            </Value>
          </ValueMain>
        </LeftSec>
      </LeftContainer>

      <RightContainer>
        <h1>right</h1>
      </RightContainer>
    </MainContainer>
  );
}
