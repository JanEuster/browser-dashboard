import { create, all } from "mathjs";
import { ChangeEvent, useEffect, useState } from "react";
import { IFlex } from "../../../types"
import { AppContainerVH, HL } from "../../common";
import { Header, HeaderTitle, Input, Result, ContentWrapper } from "./converter.styles";

const math = create(all);

const ConverterApp: React.FC<IFlex> = ({ basis, shrink, grow }) => {
  // const converterCategories = ["Length", "Area", "Volume", "Weight", "Currency"]
  const [result, setResult] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<number>(0)
  const [tex, setTex] = useState<string>("\\(\\frac{10}{4x} \\approx 2^{12}\\)");
  const placeholders = ["10 lbs to kg", "1l to gallon", "2^10", "pi rad to deg", "(242 * 11.5) / 2"]

  const evalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let res = math.evaluate(e.target.value);
      setResult(String(res))

      const node = math.parse(e.target.value);

      setTex(node.toString());
    }
    catch (err: any) {
      setResult(String(err.message))
      setTex("");
    }

  }

  // cycle placeholders
  useEffect(() => {
    let placeholderInterval = setInterval(() => {
      if (placeholder + 1 < placeholders.length) {
        setPlaceholder(placeholder + 1);
      } else {
        setPlaceholder(0);
      }
    }, 5 * 1000);

    return () => {
      clearInterval(placeholderInterval);
    }
  })

  return (
    <AppContainerVH basis={basis} shrink={shrink} grow={grow}>
      <Header>
        <HeaderTitle>Unit Converter / Calculator</HeaderTitle>
      </Header>
      <HL></HL>
      <ContentWrapper>
        <Input placeholder={placeholders[placeholder]} onChange={evalOnChange}></Input>
        <Result>{result}</Result>
      </ContentWrapper>
    </AppContainerVH >
  )
}

export default ConverterApp;