import React from "react";
import * as S from "./styles";
import { ButtonProps } from "~/types/PropsComponents";

const ButtonPrimary = ({ onClick, children, type }: ButtonProps) => {
  return (
    <S.Button onClick={onClick} type={type}>
      {children}
    </S.Button>
  );
};


export default ButtonPrimary;