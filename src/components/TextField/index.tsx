import React, { InputHTMLAttributes } from "react";
import * as S from './styles'

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} />
      <S.InfoError>{props.error}</S.InfoError>
    </div>
  );
};

export default TextField;
