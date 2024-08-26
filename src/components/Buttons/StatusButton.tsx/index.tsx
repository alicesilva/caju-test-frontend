import React from "react";
import * as S from "./styles";
import { ButtonProps } from "~/types/PropsComponents";

const StatusButton = ({ onClick, children, bgcolor }: ButtonProps) => {
  return (
    <S.ButtonSmall onClick={onClick} bgcolor={bgcolor}>
      {children}
    </S.ButtonSmall>
  );
};


export default StatusButton;