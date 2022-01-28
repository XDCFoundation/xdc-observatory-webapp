import React from "react";
import styled from "styled-components";
import { contractMethodTypes } from "../../constants";
import Web3 from "web3";
import Web3Dialog from "../explorer/web3/web3Dialog";
import { Paper } from "@material-ui/core";
import { Row } from "simple-flexbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import utility from "../../utility";

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
  padding: 15px;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
`;

const QuestionName = styled.div`
  color: #3a3a3a;
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
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
  padding: 15px;
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
  padding: 0 1.875rem 1.875rem 1.875rem;
  display: flex;
  flex-flow: column;
  gap: 15px;
  @media (min-width: 0px) and (max-width: 1240px) {
    padding: 0 15px 15px 15px;
  }
`;

const InputTypeFunctionsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
`;

const InputName = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: #3a3a3a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const ParamInput = styled.input`
  color: #343a40 !important;
  font-size: 13px;
  min-height: 35px;
  min-width: 100px;
  outline: none;
  border-radius: 4px;
  border: solid 1px #dfe2e8;
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
  text-align: left;
  color: #3a3a3a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? "#e5eafa" : "#3763dd")};
  border: ${(props) => (props.isActive ? "solid 1px #3763dd" : "")};
  width: 80px;
  cursor: ${(props) => (props.isActive ? "" : "pointer")};
  height: 30px;
  font-size: 15px;
  font-weight: 600;
  width: 150px;
  height: 45px;
  color: white;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
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
    flex-flow: column;
    padding: 15px;
    gap: 15px;
    align-items: flex-start;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    padding: 15px;
    gap: 15px;
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

const Connected = styled.div`
  width: 10px;
  height: 10px;
  background-color: #3ce3a3;
  border-radius: 50%;
`;

const ConnectToWalletButton = styled.div`
  width: ${(props) => (props.isActive ? "260px" : "180px")};
  height: 40px;
  opacity: 1;
  border-radius: 4px;
  gap: 5px;
  border: solid 1px #3763dd;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${(props) => (props.isActive ? "#3763dd" : "#e5eafa")};
  cursor: ${(props) => (props.isActive ? "" : "pointer")};
  text-align: left;
  color: ${(props) => (props.isActive ? "white" : "#3763dd")};
`;

export default function ContractWriteMethods(props) {
  const [state, setState] = React.useState({
    readResponses: [],
    writeFunctions: [],
    contractAddress: "",
    accountAddress: "",
    setWalletInfo: false,
    error: "",
    loading: false,
    isExpand: false,
  });

  React.useEffect(() => {
    let contractInfo = props.contractData ? props.contractData : {};
    contractInfo.abi = JSON.parse(
      contractInfo.abi ? contractInfo.abi : JSON.stringify([])
    );
    // let contractInfo = {
    //   abi: [
    //     {
    //       inputs: [],
    //       name: "retrieve",
    //       outputs: [
    //         {
    //           internalType: "uint256",
    //           name: "",
    //           type: "uint256",
    //         },
    //       ],
    //       stateMutability: "view",
    //       type: "function",
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: "uint256",
    //           name: "num",
    //           type: "uint256",
    //         },
    //       ],
    //       name: "store",
    //       outputs: [],
    //       stateMutability: "nonpayable",
    //       type: "function",
    //     },
    //   ],
    //   address: "0xD1312601DB0d6c8F0d5597e1Dc3AeF9E3cE3a57A",
    // };
    let writeFunction = contractInfo.abi.filter(
      (item) => item.stateMutability !== contractMethodTypes.view && item.name
    );
    writeFunction = writeFunction.map((item) => {
      return {
        ...item,
        isActive: false,
        response: {},
        loading: false,
        error: "",
        params: getFunctionParams(item),
      };
    });
    setState({
      ...state,
      writeFunctions: writeFunction,
      contractAddress: contractInfo.address
        ? contractInfo.address.replace("xdc", "0x")
        : "",
    });
  }, [props.contractData]);

  const getFunctionParams = (functionDetail) => {
    let paramKeys = {};
    functionDetail.inputs.map((item) => {
      paramKeys[item.name] = "";
    });
    return paramKeys;
  };

  const handleFunctionClick = async (
    index,
    isActive,
    haveInputs,
    hasParams = false,
    params,
    loading = false
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
        writeFunctions[index].loading = true;
        setState({ ...state, loading, writeFunctions });
        const method = writeFunctions[index].name;
        let web3 = new Web3(window.web3.currentProvider);
        const contract = new web3.eth.Contract(
          writeFunctions,
          state.contractAddress
        );
        if (hasParams) {
          await contract.methods[method](...params)
            .send({ from: state.accountAddress })
            .then(async (response) => {
              writeFunctions[index].response = {
                method,
                index,
                response,
              };
            });
        } else {
          await contract.methods[method]()
            .send({ from: state.accountAddress })
            .then(async (response) => {
              writeFunctions[index].response = {
                method,
                index,
                response,
              };
            });
        }
      }

      writeFunctions[index].isActive = true;
      writeFunctions[index].loading = false;
      setState({ ...state, writeFunctions, loading: false });
    } catch (error) {
      console.log(error);
      writeFunctions[index].loading = false;
      writeFunctions[index].error = "Transaction Failed";
      setState({
        ...state,
        // error: "Transaction Failed",
        loading: false,
        writeFunctions,
      });
    }
  };

  // const updateFunctionResponse = (method, index, response) => {
  //   let existingIndex = state.readResponses.findIndex(
  //     (item) => item.method == method && item.index == index
  //   );
  //   let methodExecutionResponse = state.readResponses;
  //   if (existingIndex !== -1) {
  //     methodExecutionResponse[existingIndex] = {
  //       method,
  //       index,
  //       response,
  //     };
  //   } else {
  //     methodExecutionResponse.push({ method, index, response });
  //   }
  //   setState({ ...state, readResponses: methodExecutionResponse });
  // };

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

    if (chainId == 51 || chainId == 50) {
      await web3.eth.getAccounts().then(async (accounts) => {
        if (!accounts || !accounts.length) {
          alert("Please login to XDCPay extension");
          return;
        }
        setState({
          ...state,
          accountAddress: accounts[0].replace("xdc", "0x"),
        });
      });
    } else {
      setState({ ...state, setWalletInfo: true });
      return;
    }
  };

  const handleExpandAllClick = async () => {
    if (!state.accountAddress) {
      alert("Please connect your wallet");
      return;
    }
    let writeFunctions = [...state.writeFunctions];
    await setState({ ...state, loading: true });

    for (let index = 0; index < state.writeFunctions.length; index++) {
      const item = state.writeFunctions[index];
      if (item.isActive) {
        writeFunctions[index] = item;

        continue;
      }
      if (item.inputs.length) {
        writeFunctions[index].isActive = true;
        writeFunctions[index].response = {};
        setState({ ...state, writeFunctions, loading: true });
      } else {
        await handleFunctionClick(index, false, false, false, false, true);
      }
    }
    setState({ ...state, writeFunctions, loading: false, isExpand: true });
  };

  const handleResetClick = () => {
    let writeFunctions = state.writeFunctions.map((item) => {
      return {
        ...item,
        // isActive: false,
        response: {},
        params: getFunctionParams(item),
      };
    });
    setState({ ...state, writeFunctions });
  };

  const handleCollpaseClick = () => {
    const writeFunctions = state.writeFunctions.map((item) => {
      return {
        ...item,
        isActive: false,
        response: {},
        loading: false,
        error: "",
      };
    });
    setState({ ...state, writeFunctions, isExpand: false });
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
            isActive={state.accountAddress.length > 0}
            disabled={state.accountAddress.length}
          >
            {!state.accountAddress.length ? (
              <>
                <ActiveDot />
                {"Connect to web3"}
              </>
            ) : (
              <>
                <Connected />
                {`Connected ${utility.shortenHash(state.accountAddress, 9)}`}
              </>
            )}
          </ConnectToWalletButton>
        </HeaderItemsContainer>
        <Row style={{ gap: 20 }} alignItems="center">
          {state.loading ? (
            <CircularProgress size={20} />
          ) : !state.isExpand ? (
            <HighlightedText onClick={() => handleExpandAllClick()}>
              Expand all
            </HighlightedText>
          ) : (
            <HighlightedText onClick={() => handleCollpaseClick()}>
              Collapse all
            </HighlightedText>
          )}
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
                  <Row style={{ gap: 10 }} alignItems="center">
                    {item.loading && item.inputs.length === 0 ? (
                      <CircularProgress size={12} />
                    ) : (
                      ""
                    )}
                    <ArrowImg
                      isActive={item.isActive}
                      src="/images/next.svg"
                    />
                  </Row>
                </QuestionNameContainer>
                {item.isActive ? (
                  <OutputContainer>
                    {item.inputs.length > 0 ? (
                      <InputTypeFunctions
                        error={state.error}
                        state={state}
                        setState={setState}
                        itemIndex={index}
                        writeFunctions={state.writeFunctions}
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

const InputTypeFunctions = ({
  functionDetail,
  handleSubmit,
  itemIndex,
  writeFunctions,
  setState,
  state,
}) => {
  const [params, setParams] = React.useState({});
  React.useEffect(() => {
    setParams(functionDetail.params);
  }, [functionDetail.params]);

  const setError = (error, index) => {
    writeFunctions[index].error = error;
    setState({ ...state, writeFunctions });
  };

  const handleParamsInput = (value, name, type) => {
    if (value.includes("xdc")) {
      value = String(value);
      value = value.replace("xdc", "0x").trim();
    }
    setError("", itemIndex);
    let param = params;
    param[name] = type === "uint256" ? Number(value) : value;
    setParams(param);
  };

  const handleInputSubmit = () => {
    let requiredInpuIndex = Object.values(params).findIndex(
      (item) => String(item).length == 0
    );
    if (requiredInpuIndex !== -1) {
      setError(
        `${Object.keys(params)[requiredInpuIndex]} is required field`,
        itemIndex
      );
      return;
    }
    let request = { ...params };
    for (let index = 0; index < Object.keys(params).length; index++) {
      const element = Object.keys(params)[index];
      let input = functionDetail.inputs.find((item) => item.name == element);
      if (input.type == "bool") {
        request[element] = Boolean(request[element]);
      } else if (input.type.includes("uint")) {
        try {
          checkNumberType(request[element]);
          request[element] = request[element];
        } catch (error) {
          setError("Invalid value for type " + input.type, itemIndex);
          return;
        }
      } else if (input.type.includes("map")) {
        try {
          request[element] = JSON.parse(request[element]);
        } catch (error) { }
      } else {
        request[element] = request[element];
      }
    }
    // console.log(request);
    handleSubmit(itemIndex, false, false, true, Object.values(request));
  };

  return (
    <>
      {functionDetail.inputs.map((item, idx) => {
        return (
          <InputTypeFunctionsContainer key={idx}>
            <InputName>{item.name}</InputName>
            <ParamInput
              placeholder={item.type}
              value={params[item.name]}
              onChange={(event) =>
                handleParamsInput(event.target.value, item.name, item.type)
              }
            />
          </InputTypeFunctionsContainer>
        );
      })}
      <SubmitButton
        onClick={() => handleInputSubmit()}
        disabled={functionDetail.loading}
        isActive={functionDetail.loading}
      >
        {functionDetail.loading ? <CircularProgress size={20} /> : "Write"}
      </SubmitButton>
      {functionDetail.error ? (
        <ErrorText>{functionDetail.error}</ErrorText>
      ) : (
        ""
      )}
      {functionDetail?.response?.response ? (
        // <OutPutComponent item={functionDetail} />
        <TransactionResponse item={functionDetail} />
      ) : (
        ""
      )}
    </>
  );
};

const OutPutComponent = ({ item }) => {
  return (
    <>
      <Output>{item?.response?.response}</Output>
      <Devider />
      <InputName>Return Value Type</InputName>
      <Output>{item.outputs.map((it) => it.type).join(",")}</Output>
    </>
  );
};

const ResponseTableContainer = styled.div`
  border-radius: 4px;
  border: solid 1px #dfe2e8;
`;

const ResponseTableRow = styled.td`
  padding: ${(props) => (props.padding ? props.padding : "15px 15px 0 15px")};
  word-break: break-all;
  white-space: ${(props) => (props.isSpace ? "nowrap" : "")};
`;

const TransactionResponse = ({ item }) => {
  const { response } = item;
  return (
    <ResponseTableContainer>
      <table>
        <tr>
          <ResponseTableRow isSpace={true}>
            <InputName>Transaction Hash</InputName>
          </ResponseTableRow>
          <ResponseTableRow>
            <Output>{response?.response?.transactionHash}</Output>
          </ResponseTableRow>
        </tr>
        <tr>
          <ResponseTableRow isSpace={true}>
            <InputName>Status</InputName>
          </ResponseTableRow>
          <ResponseTableRow>
            <Output>{response?.response?.status ? "Success" : "Failed"}</Output>
          </ResponseTableRow>
        </tr>
        <tr>
          <ResponseTableRow isSpace={true}>
            <InputName>Gas Price</InputName>
          </ResponseTableRow>
          <ResponseTableRow>
            <Output>{response?.response?.gasUsed}</Output>
          </ResponseTableRow>
        </tr>
        <tr>
          <ResponseTableRow isSpace={true} padding="15px">
            <InputName>Block Number</InputName>
          </ResponseTableRow>
          <ResponseTableRow padding="15px">
            <Output>{response?.response?.blockNumber}</Output>
          </ResponseTableRow>
        </tr>
      </table>
    </ResponseTableContainer>
  );
};

const checkNumberType = (number) => {
  const isFloat = Number(number) === number && number % 1 !== 0;
  if (isFloat) {
    throw `Invalid input`;
  }
};
