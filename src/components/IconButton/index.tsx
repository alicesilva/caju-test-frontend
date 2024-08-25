import React, { ReactNode, HTMLAttributes } from "react";
import * as S from "./styles";

type IconButtonProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const IconButton = (props: IconButtonProps) => {
  return <S.IconButton {...props}>{props.children}</S.IconButton>;
};

export default IconButton;
