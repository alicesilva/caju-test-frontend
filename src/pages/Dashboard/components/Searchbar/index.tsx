import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { Dispatch, SetStateAction } from "react";
import { CPFMask } from "~/constants/cpfMask";

type Props = {
  setSearchQuery?: Dispatch<SetStateAction<string>>;
};

export const SearchBar = (props: Props) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" setSearchQuery={props.setSearchQuery} mask={CPFMask} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
