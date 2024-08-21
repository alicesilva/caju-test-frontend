import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { useIMask } from "react-imask";
import { useFecthData } from "~/hooks/useFetchData";

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;
type Props = {
  label?: string;
  error?: string;
  mask?: string
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {

  const { setSearchQuery} = useFecthData();

  const { ref } = useIMask(
    { mask: props?.mask },
    {
      onComplete: (value) => {
        setSearchQuery(value)
      },
      onAccept: (value) => {
        if(value.trim().length === 0){
          setSearchQuery(value)
        }
      }
    }
  );

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input ref={ref} {...props} />
      <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
    </div>
  );
};

export default TextField;
