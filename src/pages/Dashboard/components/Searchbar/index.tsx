import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { CPFMask } from "~/constants/cpfMask";
import { useFecthData } from "~/hooks/useFetchData";

export const SearchBar = () => {
  const history = useHistory();
  const { setIsLoading } = useFecthData();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" mask={CPFMask} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => setIsLoading(true)}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
