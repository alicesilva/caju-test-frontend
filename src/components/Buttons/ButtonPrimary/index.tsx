import React, { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  autoFocus?: boolean
};

const ButtonPrimary = ({ onClick, children, type, autoFocus = false}: Props) => {
  return (
    <S.Button onClick={onClick} type={type} autoFocus={autoFocus}>
      {children}
    </S.Button>
  );
};


export default ButtonPrimary;