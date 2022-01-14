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
  gap: 10px;
  background-color: white;
  padding: 1.5rem;
`;

const MainTitle = styled.div`
  color: #343a40 !important;
  font-weight: bold;
  font-size: 15px;
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
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const InputName = styled.div`
  color: #343a40 !important;
  word-wrap: break-word;
  font-size: 13px;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 12px;
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
  background-color: ${(props) => (props.isActive ? "#e5eafa" : "#3763dd")};
  border: ${(props) => (props.isActive ? "solid 1px #3763dd" : "")};
  width: 80px;
  cursor: ${(props) => (props.isActive ? "" : "pointer")};
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

export default function ContractRead(props) {
  const [state, setState] = React.useState({
    readResponses: [],
    readFunctions: [],
    contractAddress: "",
    loading: false,
    error: "",
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

  const handleFunctionClick = async (
    index,
    isActive,
    haveInputs,
    hasParams = false,
    params
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
      setState({ ...state, readFunctions, loading: true });
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
      console.log(error);
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
        isActive: false,
        response: {},
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
        readFunctions.push(item);
        continue;
      }
      if (item.inputs.length) {
        readFunctions[index].isActive = true;
        readFunctions[index].response = {};
        setState({ ...state, readFunctions, loading: true });
      } else {
        await handleFunctionClick(index, false, false, false, false);
      }
    }
    setState({ ...state, readFunctions, loading: false });
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
          <img src="/images/contract.svg" />
          <MainTitle>Read Contract Information</MainTitle>
        </HeaderItemsContainer>
        <Row style={{ gap: 20 }} alignItems="center">
          {state.loading ? (
            <CircularProgress />
          ) : (
            <HighlightedText onClick={() => handleExpandAllClick()}>
              Expand all
            </HighlightedText>
          )}
          <HeaderItemsContainer onClick={() => handleResetClick()}>
            <HighlightedText>Reset</HighlightedText>
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
}) => {
  return (
    <QuestionContainer isActive={item.isActive} key={index}>
      <QuestionNameContainer
        onClick={() =>
          handleFunctionClick(index, item.isActive, item.inputs.length > 0)
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
              state={state}
              setState={setState}
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
};

const InputTypeFunctions = ({
  functionDetail,
  handleSubmit,
  itemIndex,
  setState,
  state,
}) => {
  const [params, setParams] = React.useState({});
  const error = functionDetail.error ? functionDetail.error : "";

  React.useEffect(() => {
    console.log(functionDetail.inputs, "functionDetail.inputs");
    let paramKeys = {};
    functionDetail.inputs.map((item) => {
      paramKeys[item.name] = "";
    });
    console.log(paramKeys);
    setParams(paramKeys);
  }, [functionDetail]);

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
        } catch (error) {}
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
      <SubmitButton
        onClick={() => handleInputSubmit()}
        disabled={functionDetail.loading}
        isActive={functionDetail.loading}
      >
        {functionDetail.loading ? <CircularProgress /> : "Submit"}
      </SubmitButton>
      <ErrorText>{error}</ErrorText>
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

const OutPutComponent = ({ item }) => {
  return (
    <>
      <Title>Output:</Title>
      <Output>{item?.response?.response}</Output>
      <Devider />
      <Title>Return Value Type:</Title>
      <Output>{item.outputs.map((it) => it.type).join(",")}</Output>
    </>
  );
};
