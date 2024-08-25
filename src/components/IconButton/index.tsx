import * as S from "./styles";

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

const IconButton = (props: IconButtonProps) => {
  return (
    <S._IconButtonStyled {...props}>
      {props.children}
    </S._IconButtonStyled>
  );
};

export default IconButton;
