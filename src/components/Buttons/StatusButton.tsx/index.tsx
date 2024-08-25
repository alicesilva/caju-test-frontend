import React, { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  bgcolor?: string;
};

const StatusButton = ({ onClick, children, bgcolor }: Props) => {
  return (
    <S.ButtonSmall onClick={onClick} bgcolor={bgcolor}>
      {children}
    </S.ButtonSmall>
  );
};


export default StatusButton;