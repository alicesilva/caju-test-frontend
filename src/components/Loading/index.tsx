import React from 'react';
import { ColorRing } from "react-loader-spinner";
import * as S from "./styles";

const Loading = () => {
  return (
    <S.Spinner data-testid="loading-spinner">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={["#ff7500", "#e80537", "#ff7500", "#e80537", "#e80537"]}
      />
    </S.Spinner>
  );
};

export default Loading;
