import React from "react";
import styled from "styled-components";
import { contractMethodTypes } from "../../constants";
import Web3 from "web3";
import Web3Dialog from "../explorer/web3/web3Dialog";
import { Paper } from "@material-ui/core";
import { Row } from "simple-flexbox";

const QuestionContainer = styled.div`
  font-weight: 400;
  color: #212529;
  border: solid 1px #dfe2e8;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 4px;
  height: ${(props) => (props.isActive ? "auto" : "50px")};
  transition: height 0.5s ease-out;
`;
const QuestionNameContainer = styled.div`
  color: #343a40 !important;
  height: 50px;
  background-color: #f8f9fa !important;
  display: flex;
  flex-flow: row;
  border-bottom: solid 1px #dfe2e8;
  padding: 15px 24px;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
`;

const QuestionName = styled.div`
  color: #3a3a3a;
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.58px;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const ArrowImg = styled.img`
  transform: ${(props) => (props.isActive ? "rotate(90deg)" : "")};
  transition: transform 0.5s ease-in-out;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
  background-color: white;
  padding: 1.5rem;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Output = styled.div`
  word-wrap: break-word;
  font-size: 15px;
  color: #3a3a3a;
  font-weight: 500;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Devider = styled.hr`
  background-color: #dfe2e8;
`;

const ParentContainer = styled.div`
  padding: 0 1.875rem 1.875rem;
  display: flex;
  flex-flow: column;
  gap: 10px;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 0 0.75rem 1.875rem 0.75rem;
  }
`;

const InputTypeFunctionsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
`;

const InputName = styled.div`
  color: #343a40 !important;
  word-wrap: break-word;
  font-size: 13px;
`;

const ParamInput = styled.input`
  color: #343a40 !important;
  font-size: 13px;
  min-height: 35px;
  min-width: 100px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  padding: 5px;

  :active {
    outline: none;
  }
  :hover {
    outline: none;
  }
`;

const Title = styled.div`
  width: 217px;
  height: 20px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.62px;
  text-align: left;
  color: #3a3a3a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  background-color: #3763dd;
  width: 80px;
  cursor: pointer;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  width: 150px;
  height: 45px;
  margin-top: 20px;
  color: white;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
`;

const HighlightedText = styled.div`
  display: flex;
  font-family: Inter;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.54px;
  text-align: left;
  color: #2149b9;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 1.875rem;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 1.875rem 0.75rem;
    flex-flow: column;
    gap: 1.25rem;
    align-items: flex-start;
  }
`;

const HeaderItemsContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 5px;
`;

const ActiveDot = styled.div`
  width: 7px;
  height: 7px;
  background-color: #3763dd;
  border-radius: 50%;
`;

const ConnectToWalletButton = styled.div`
  width: 180px;
  height: 40px;
  opacity: 1;
  border-radius: 4px;
  gap: 5px;
  border: solid 1px #3763dd;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #e5eafa;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.62px;
  text-align: left;
  color: #3763dd;
`;

export default function ContractWriteMethods(props) {
  const [state, setState] = React.useState({
    readResponses: [],
    writeFunctions: [],
    contractAddress: "",
    accountAddress: "",
    setWalletInfo: false,
  });

  React.useEffect(() => {
    let contractInfo = props.contractData ? props.contractData : {};
    contractInfo.abi = JSON.parse(
      contractInfo.abi ? contractInfo.abi : JSON.stringify([])
    );
    let writeFunction = contractInfo.abi.filter(
      (item) => item.stateMutability !== contractMethodTypes.view && item.name
    );
    writeFunction = writeFunction.map((item) => {
      return { ...item, isActive: false, response: {} };
    });
    setState({
      ...state,
      writeFunctions: writeFunction,
      contractAddress: contractInfo.address
        ? contractInfo.address.replace("xdc", "0x")
        : "",
    });
  }, [props.contractData]);

  const handleFunctionClick = async (
    index,
    isActive,
    haveInputs,
    hasParams = false,
    params
  ) => {
    if (!state.accountAddress) {
      alert("Please connect your wallet");
      return;
    }
    let writeFunctions = [...state.writeFunctions];

    if (isActive) {
      writeFunctions[index].isActive = false;
      writeFunctions[index].response = {};
      setState({ ...state, writeFunctions });
      return;
    }
    try {
      if (!haveInputs) {
        const method = writeFunctions[index].name;
        let web3 = new Web3(process.env.REACT_APP_WEB3_URL);
        const contract = new web3.eth.Contract(
          writeFunctions,
          state.contractAddress
        );
        if (hasParams) {
          await contract.methods[method](...params)
            .send({ from: state.accountAddress.trim().replace("xdc", "0x") })
            .then(async (response) => {
              debugger;
              console.log(response, "response");
              updateFunctionResponse(method, index, response, writeFunctions);
              writeFunctions[index].response = { method, index, response };
            });
        } else {
          await contract.methods[method]()
            .send({ from: state.accountAddress.trim().replace("xdc", "0x") })
            .then(async (response) => {
              debugger;
              console.log(response, "response");
              updateFunctionResponse(method, index, response, writeFunctions);
              writeFunctions[index].response = { method, index, response };
            });
        }
      }
      writeFunctions[index].isActive = true;
      setState({ ...state, writeFunctions });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFunctionResponse = (method, index, response) => {
    let existingIndex = state.readResponses.findIndex(
      (item) => item.method == method && item.index == index
    );
    let methodExecutionResponse = state.readResponses;
    if (existingIndex !== -1) {
      methodExecutionResponse[existingIndex] = {
        method,
        index,
        response,
      };
    } else {
      methodExecutionResponse.push({ method, index, response });
    }
    setState({ ...state, readResponses: methodExecutionResponse });
  };

  const handleWeb3ConnectClick = async () => {
    // setState({ ...state, setWalletInfo: true });

    if (!window.web3) {
      console.log("Please install XDCPay extension");
      setState({ ...state, setWalletInfo: true });
      return;
    }

    let web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();

    const chainId = await web3.eth.net.getId();
    if (chainId !== 51) {
      setState({ ...state, setWalletInfo: true });
      return;
    }

    await web3.eth.getAccounts().then(async (accounts) => {
      if (!accounts || !accounts.length) {
        alert("Please login to XDCPay extension");
        return;
      }
      setState({ ...state, accountAddress: accounts[0] });
    });
  };

  const handleExpandAllClick = async () => {
    let writeFunctions = [];
    for (let index = 0; index < state.writeFunctions.length; index++) {
      const item = state.writeFunctions[index];

      if (item.inputs.length) {
        writeFunctions.push({
          ...item,
          isActive: true,
          response: {},
        });
      } else {
        const response = await handleFunctionClick(index, false, false, false);
        writeFunctions.push({
          ...item,
          response,
          isActive: true,
        });
      }
    }
    setState({ ...state, writeFunctions });
  };
  const handleResetClick = () => {
    let writeFunctions = state.writeFunctions.map((item) => {
      return {
        ...item,
        isActive: false,
        response: {},
      };
    });
    setState({ ...state, writeFunctions });
  };

  return (
    <Paper
      style={{
        borderRadius: "14px",
        boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
      }}
      elevation={0}
    >
      <HeaderContainer>
        <HeaderItemsContainer>
          <ConnectToWalletButton
            onClick={() => handleWeb3ConnectClick()}
            isActive={state.accountAddress.length}
            disabled={state.accountAddress.length}
          >
            <ActiveDot />
            {state.accountAddress.length ? "Connected" : "Connect to web3"}
          </ConnectToWalletButton>
        </HeaderItemsContainer>
        <Row style={{ gap: 20 }} alignItems="center">
          <HighlightedText onClick={() => handleExpandAllClick()}>
            Expand all
          </HighlightedText>
          <HeaderItemsContainer onClick={() => handleResetClick()}>
            <HighlightedText>Reset</HighlightedText>
            <img src="/images/reset.svg" />
          </HeaderItemsContainer>
        </Row>
      </HeaderContainer>
      <ParentContainer>
        <Web3Dialog
          open={state.setWalletInfo}
          setWeb3DialogOpen={() => setState({ ...state, setWalletInfo: false })}
          connectToWalletMessage="Click on 'Connect to wallet' to continue with transactions."
        />

        {state.writeFunctions && state.writeFunctions.length
          ? state.writeFunctions.map((item, index) => {
              return (
                <QuestionContainer isActive={item.isActive} key={index}>
                  <QuestionNameContainer
                    onClick={() =>
                      handleFunctionClick(
                        index,
                        item.isActive,
                        item.inputs.length > 0
                      )
                    }
                  >
                    <QuestionName>{`${index + 1}. ${item.name}`}</QuestionName>
                    <ArrowImg isActive={item.isActive} src="/images/next.svg" />
                  </QuestionNameContainer>
                  {item.isActive ? (
                    <OutputContainer>
                      {item.inputs.length > 0 ? (
                        <InputTypeFunctions
                          itemIndex={index}
                          functionDetail={item}
                          handleSubmit={handleFunctionClick}
                        />
                      ) : (
                        <OutPutComponent item={item} />
                      )}
                    </OutputContainer>
                  ) : (
                    ""
                  )}
                </QuestionContainer>
              );
            })
          : ""}
      </ParentContainer>
    </Paper>
  );
}

const InputTypeFunctions = ({ functionDetail, handleSubmit, itemIndex }) => {
  const [params, setParams] = React.useState({});
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    let paramKeys = {};
    functionDetail.inputs.map((item) => {
      paramKeys[item.name] = item.type === "uint256" ? 0 : "";
    });
    setParams(paramKeys);
  }, [functionDetail]);

  const handleParamsInput = (value, name, type) => {
    if (value.includes("xdc")) {
      value = value.replace(/^.{3}/g, "0x");
    }
    setError("");
    let param = params;
    param[name] = type === "uint256" ? Number(value) : value;
    setParams(param);
    console.log("params", params);
  };

  const handleInputSubmit = () => {
    let requiredInpuIndex = Object.values(params).findIndex(
      (item) => String(item).length == 0
    );
    if (requiredInpuIndex !== -1) {
      setError(`${Object.keys(params)[requiredInpuIndex]} is required field`);
      return;
    }
    debugger;
    // handleSubmit(itemIndex, false, false, true, Object.values(params));
  };

  return (
    <>
      {functionDetail.inputs.map((item, idx) => {
        return (
          <InputTypeFunctionsContainer key={idx}>
            <InputName>{item.name}</InputName>
            <ParamInput
              placeholder={item.type}
              onChange={(event) =>
                handleParamsInput(event.target.value, item.name, item.type)
              }
            />
          </InputTypeFunctionsContainer>
        );
      })}
      <SubmitButton onClick={() => handleInputSubmit()}>Write</SubmitButton>
      <ErrorText>{error}</ErrorText>
      {functionDetail?.response?.response ? (
        <OutPutComponent item={functionDetail} />
      ) : (
        ""
      )}
    </>
  );
};

const OutPutComponent = ({ item }) => {
  return (
    <>
      <Title>Output</Title>
      <Output>{item?.response?.response}</Output>
      <Devider />
      <Title>Return Value Type</Title>
      <Output>{item.outputs.map((it) => it.type).join(",")}</Output>
    </>
  );
};
