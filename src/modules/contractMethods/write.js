import React from "react";
import styled from "styled-components";
import { contractMethodTypes } from "../../constants";
import Web3 from "web3";
import Web3Dialog from "../explorer/web3/web3Dialog";

const QuestionContainer = styled.div`
  background-color: #f8f9fa !important;
  font-weight: 400;
  color: #212529;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.5rem;
  height: ${(props) => (props.isActive ? "auto" : "40px")};
  min-height: ${(props) => (props.isActive ? "100px" : "40px")};
  transition: min-height 0.5s ease-out;
`;
const QuestionNameContainer = styled.div`
  color: #343a40 !important;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: 40px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const QuestionName = styled.div`
  color: #343a40 !important;
  padding: 0.5rem;
`;

const ArrowImg = styled.img`
  transform: ${(props) => (props.isActive ? "rotate(90deg)" : "")};
  transition: transform 0.5s ease-in-out;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-radius: 0.5rem;
  gap: 10px;
  background-color: white;
  padding: 1.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.125);
  border-right: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const Title = styled.div`
  color: #343a40 !important;
  font-weight: bold;
  font-size: 15px;
`;

const Output = styled.div`
  color: #343a40 !important;
  word-wrap: break-word;
  font-size: 15px;
`;

const Devider = styled.hr``;

const ParentContainer = styled.div`
  padding: 1.875rem;
  display: flex;
  flex-flow: column;
  gap: 10px;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 1.875rem 0.75rem 0 0.75rem;
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

const SubmitButton = styled.button`
  border-radius: 5px;
  border: 1px solid #d5dae2;
  background: linear-gradient(to bottom, #2149b9, #3e71ff);
  width: 80px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
`;

const ConnectToWalletButton = styled.button`
  border-radius: 5px;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(to bottom, #2149b9, #3e71ff)"
      : "#d5dae2"};
  width: 145px;
  cursor: ${(props) => (props.isActive ? "" : "pointer")};
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "white" : "black")};
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
    contractInfo.abi = JSON.parse(contractInfo.abi);
    let writeFunction = contractInfo.abi.filter(
      (item) => item.stateMutability !== contractMethodTypes.view && item.name
    );
    writeFunction = writeFunction.map((item) => {
      return { ...item, isActive: false, response: {} };
    });
    setState({
      ...state,
      writeFunctions: writeFunction,
      contractAddress: contractInfo.address.replace("xdc", "0x"),
    });
    console.log("writeFunction", writeFunction);
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
            .send({ from: state.accountAddress })
            .then(async (response) => {
              updateFunctionResponse(method, index, response, writeFunctions);
              writeFunctions[index].response = { method, index, response };
            });
        } else {
          await contract.methods[method]()
            .send({ from: state.accountAddress })
            .then(async (response) => {
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

  return (
    <ParentContainer>
      <Web3Dialog
        open={state.setWalletInfo}
        setWeb3DialogOpen={() => setState({ ...state, setWalletInfo: false })}
        connectToWalletMessage="Click on 'Connect to wallet' to continue with transactions."
      />
      <ConnectToWalletButton
        onClick={() => handleWeb3ConnectClick()}
        isActive={state.accountAddress.length}
        disabled={state.accountAddress.length}
      >
        {state.accountAddress.length ? "Connected" : "Connect to wallet"}
      </ConnectToWalletButton>
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
  );
}

const InputTypeFunctions = ({ functionDetail, handleSubmit, itemIndex }) => {
  const [params, setParams] = React.useState({});
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    let paramKeys = {};
    functionDetail.inputs.map((item) => {
      paramKeys[item.name] = "";
    });
    setParams(paramKeys);
  }, [functionDetail]);

  const handleParamsInput = (value, name) => {
    if (value.includes("xdc")) {
      value = value.replace(/^.{3}/g, "0x");
    }
    setError("");
    let param = params;
    param[name] = value;
    setParams(param);
  };

  const handleInputSubmit = () => {
    let requiredInpuIndex = Object.values(params).findIndex(
      (item) => item.length == 0
    );
    if (requiredInpuIndex !== -1) {
      setError(`${Object.keys(params)[requiredInpuIndex]} is required field`);
      return;
    }
    handleSubmit(itemIndex, false, false, true, Object.values(params));
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
                handleParamsInput(event.target.value, item.name)
              }
            />
          </InputTypeFunctionsContainer>
        );
      })}
      <SubmitButton onClick={() => handleInputSubmit()}>Submit</SubmitButton>
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
