import React from "react";
import styled from "styled-components";
import { contractMethodTypes } from "../../constants";
import Web3 from "web3";
import { Paper } from "@material-ui/core";
import { Row } from "simple-flexbox";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  ${({ theme }) => theme === "dark" && `
    border: none;
  `}
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
  ${({ theme }) => theme === "dark" && `
    background-color: #3f4966 !important;
    border: solid 1px #3552a5;
    outline: none;
  `}
`;

const QuestionName = styled.div`
  color: #3a3a3a;
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  ${({ theme }) => theme === "dark" && `
    color: #fff;
  `}
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
  ${({ theme }) => theme === "dark" && `
    background-color: #3f4966 !important;
  `}
`;

const MainTitle = styled.div`
  color: #343a40 !important;
  font-weight: bold;
  font-size: 15px;
  ${({ theme }) => theme === "dark" && `
    color: #fff !important;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Output = styled.div`
  word-wrap: break-word;
  font-size: 15px;
  color: #3a3a3a;
  font-weight: 500;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1 !important;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Devider = styled.div`
  background-color: #dfe2e8;
  height: 1px;
  ${({ theme }) => theme === "dark" && `
    background-color: #4a5d94;
  `}
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
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const InputName = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: #3a3a3a;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1 !important;
  `}
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
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  padding: 5px;
  ${({ theme }) => theme === "dark" && `
    border: solid 1px #3552a5 !important;
    background-color: #192a59 !important;
    color: #fff !important;
  `}

  :active {
    outline: none;
    ${({ theme }) => theme === "dark" && `
      border: solid 1px #3552a5 !important;
    `}
  }
  :hover {
    outline: none;
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
  ${({ theme }) => theme === "dark" && `
    color: #4878ff;
  `}
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

export default function ContractRead(props) {
  const [state, setState] = React.useState({
    readResponses: [],
    readFunctions: [],
    contractAddress: "",
    loading: false,
    error: "",
    isExpand: false,
  });

  React.useEffect(() => {
    let contractInfo = props.contractData ? props.contractData : {};
    contractInfo.abi = JSON.parse(
      contractInfo.abi ? contractInfo.abi : JSON.stringify([])
    );
    let readFunction = contractInfo.abi.filter(
      (item) => item.stateMutability == contractMethodTypes.view
    );
    readFunction = readFunction.map((item) => {
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
      readFunctions: readFunction,
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
    let readFunctions = [...state.readFunctions];

    if (isActive) {
      readFunctions[index].isActive = false;
      readFunctions[index].response = {};
      setState({ ...state, readFunctions });
      return;
    }
    try {
      readFunctions[index].loading = true;
      setState({ ...state, readFunctions, loading });
      if (!haveInputs) {
        const method = readFunctions[index].name;
        let web3 = new Web3(process.env.REACT_APP_WEB3_URL);
        const contract = new web3.eth.Contract(
          readFunctions,
          state.contractAddress
        );
        let response = hasParams
          ? await contract.methods[method](...params).call()
          : await contract.methods[method]().call();

        readFunctions[index].response = { method, index, response };
      }
      readFunctions[index].isActive = true;
      readFunctions[index].loading = false;
      setState({ ...state, readFunctions });
    } catch (error) {
      readFunctions[index].loading = false;
      readFunctions[index].error = "Transaction failed";
      setState({
        ...state,
        readFunctions,
      });
    }
  };

  const handleResetClick = () => {
    let readFunctions = state.readFunctions.map((item) => {
      return {
        ...item,
        // isActive: false,
        response: {},
        params: getFunctionParams(item),
      };
    });
    setState({ ...state, readFunctions });
  };

  const handleExpandAllClick = async () => {
    let readFunctions = [...state.readFunctions];
    await setState({ ...state, loading: true });

    for (let index = 0; index < state.readFunctions.length; index++) {
      const item = state.readFunctions[index];
      if (item.isActive) {
        readFunctions[index] = item;
        continue;
      }
      if (item.inputs.length) {
        readFunctions[index].isActive = true;
        readFunctions[index].response = {};
        setState({ ...state, readFunctions, loading: true });
      } else {
        await handleFunctionClick(index, false, false, false, true);
      }
    }
    setState({ ...state, readFunctions, loading: false, isExpand: true });
  };

  const handleCollpaseClick = () => {
    const readFunctions = state.readFunctions.map((item) => {
      return {
        ...item,
        isActive: false,
        response: {},
        loading: false,
        error: "",
      };
    });
    setState({ ...state, readFunctions, isExpand: false });
  };

  return (
    <Paper
      style={props.theme === "dark" ? {
        borderRadius: "14px",
        boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: "#192a59"
      } : {
        borderRadius: "14px",
        boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
      }}
      elevation={0}
    >
      <HeaderContainer>
        <HeaderItemsContainer>
          <img src="/images/contract.svg" />
          <MainTitle theme={props.theme}>Read Contract Information</MainTitle>
        </HeaderItemsContainer>
        <Row style={{ gap: 20 }} alignItems="center">
          {state.loading ? (
            <CircularProgress size={20} />
          ) : !state.isExpand ? (
            <HighlightedText theme={props.theme} onClick={() => handleExpandAllClick()}>
              Expand all
            </HighlightedText>
          ) : (
            <HighlightedText theme={props.theme} onClick={() => handleCollpaseClick()}>
              Collapse all
            </HighlightedText>
          )}
          <HeaderItemsContainer onClick={() => handleResetClick()}>
            <HighlightedText theme={props.theme}>Reset</HighlightedText>
            <img src="/images/reset.svg" />
          </HeaderItemsContainer>
        </Row>
      </HeaderContainer>
      <ParentContainer>
        {state.readFunctions && state.readFunctions.length
          ? state.readFunctions.map((item, index) => {
            return (
              <FunctionContainer
                item={item}
                index={index}
                setState={setState}
                state={state}
                handleFunctionClick={handleFunctionClick}
                theme={props.theme}
              />
            );
          })
          : ""}
      </ParentContainer>
    </Paper>
  );
}

const FunctionContainer = ({
  item,
  index,
  state,
  handleFunctionClick,
  setState,
  theme
}) => {
  return (
    <QuestionContainer theme={theme} isActive={item.isActive} key={index}>
      <QuestionNameContainer
        theme={theme}
        onClick={() =>
          handleFunctionClick(
            index,
            item.isActive,
            item.inputs.length > 0,
            false,
            false,
            false
          )
        }
      >
        <QuestionName theme={theme}>{`${index + 1}. ${item.name}`}</QuestionName>
        <Row style={{ gap: 10 }} alignItems="center">
          {item.loading && item.inputs.length === 0 ? (
            <CircularProgress size={10} />
          ) : (
            ""
          )}
          <ArrowImg isActive={item.isActive} src="/images/next.svg" />
        </Row>
      </QuestionNameContainer>
      {item.isActive ? (
        <OutputContainer theme={theme}>
          {item.inputs.length > 0 ? (
            <InputTypeFunctions
              itemIndex={index}
              state={state}
              setState={setState}
              functionDetail={item}
              handleSubmit={handleFunctionClick}
              theme={theme}
            />
          ) : (
            <OutPutComponent item={item} theme={theme}/>
          )}
        </OutputContainer>
      ) : (
        ""
      )}
    </QuestionContainer>
  );
};

const InputTypeFunctions = ({
  functionDetail,
  handleSubmit,
  itemIndex,
  setState,
  state,
  theme
}) => {
  const [params, setParams] = React.useState({});
  const error = functionDetail.error ? functionDetail.error : "";

  React.useEffect(() => {
    setParams(functionDetail.params);
  }, [functionDetail.params]);

  const setError = (error, index) => {
    let readFunctions = state.readFunctions;
    readFunctions[index].error = error;
    setState({ ...state, readFunctions });
  };

  const handleParamsInput = (value, name, type) => {
    if (value.includes("xdc")) {
      value = value.replace(/^.{3}/g, "0x");
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
    handleSubmit(itemIndex, false, false, true, Object.values(request));
  };

  return (
    <>
      {functionDetail.inputs.map((item, idx) => {
        return (
          <InputTypeFunctionsContainer key={idx}>
            <InputName theme={theme}>{item.name}</InputName>
            <ParamInput
              placeholder={item.type}
              value={params[item.name]}
              onChange={(event) =>
                handleParamsInput(event.target.value, item.name, item.type)
              }
              theme={theme}
            />
          </InputTypeFunctionsContainer>
        );
      })}
      <SubmitButton
        onClick={() => handleInputSubmit()}
        disabled={functionDetail.loading}
        isActive={functionDetail.loading}
      >
        {functionDetail.loading ? <CircularProgress size={20} /> : "Submit"}
      </SubmitButton>
      {error ? <ErrorText>{error}</ErrorText> : ""}
      {functionDetail?.response?.response ? (
        <OutPutComponent item={functionDetail} />
      ) : (
        ""
      )}
    </>
  );
};

const checkNumberType = (number) => {
  const isFloat = Number(number) === number && number % 1 !== 0;
  if (isFloat) {
    throw `Invalid input`;
  }
};

const OutPutComponent = ({ item,theme }) => {
  return (
    <>
      {/* <Title>Output:</Title> */}
      <Output theme={theme}>{item?.response?.response}</Output>
      <Devider theme={theme}/>
      <InputName theme={theme}>Return:</InputName>
      <Output theme={theme}>{item.outputs.map((it) => it.type).join(",")}</Output>
    </>
  );
};
