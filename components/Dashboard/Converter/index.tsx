import { create, all } from "mathjs";
import { ChangeEvent, useState } from "react";
import { IFlex } from "../../../types"
import { AppContainerVH, HL } from "../../common";
import { Header, HeaderTitle, Input, Result, Wrapper } from "./converter.styles";

const math = create(all);

const ConverterApp: React.FC<IFlex> = ({ basis, shrink, grow }) => {
  // const converterCategories = ["Length", "Area", "Volume", "Weight", "Currency"]
  const [result, setResult] = useState<string>("");

  const evalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let res = math.evaluate(e.target.value);
      setResult(String(res))
    }
    catch (err: any) {
      if (!err.message == undefined) {
        setResult(String(err.message))
      }
    }

  }

  return (
    <AppContainerVH basis={basis} shrink={shrink} grow={grow}>
      <Header>
        <HeaderTitle>Unit Converter / Calculator</HeaderTitle>
      </Header>
      <HL></HL>
      <Wrapper>
        <Input placeholder="10 lbs to kg" onChange={evalOnChange}></Input>
        <Result>{result}</Result>
      </Wrapper>
    </AppContainerVH >
  )
}

export default ConverterApp;