import React from "react";
import * as S from './styles'
import { TextFieldProps } from "~/types/PropsComponents";


const TextField = (props: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} />
      <S.InfoError>{props.error}</S.InfoError>
    </div>
  );
};

export default TextField;
