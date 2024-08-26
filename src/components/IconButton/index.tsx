import React from "react";
import * as S from "./styles";
import { ButtonProps } from "~/types/PropsComponents";


const IconButton = (props: ButtonProps) => {
  return <S.IconButton {...props}>{props.children}</S.IconButton>;
};

export default IconButton;
