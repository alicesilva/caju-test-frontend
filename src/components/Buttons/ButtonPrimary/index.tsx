import React, { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const ButtonPrimary = ({ onClick, children, type }: Props) => {
  return (
    <S.Button onClick={onClick} type={type}>
      {children}
    </S.Button>
  );
};


export default ButtonPrimary;