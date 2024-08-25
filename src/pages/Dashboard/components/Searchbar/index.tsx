import React, {useState} from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import IconButton  from "~/components/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useFecthData } from "~/components/contexts/RegistrationData";
import { cpfMask } from "~/helpers/cpfMask";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";
import { regex } from "~/constants/regex";

const SearchBar = () => {
  const history = useHistory();
  const { setRefetch, setSearchQuery } = useFecthData();
  const [query, setQuery] = useState("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onComplete = (value: string) => {
    if (value.match(regex.CPF)) {
      setSearchQuery(deleteMaskCpf(value));
    }
  }

  const onInputCleared = (value: string) => {
    if (value.length === 0) {
      setSearchQuery(value);
    }
  }

  const handleRefresh = () => {
    setRefetch(true);
    setSearchQuery("");
    setQuery("");
  }

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={query}
        onChange={(e) => {
            e.target.value = cpfMask(e.target.value);
            setQuery(e.target.value)
            onComplete(e.target.value)
            onInputCleared(e.target.value)
        }}
      />
      <S.Actions>
        <IconButton
          data-testid="refresh-icon"
          aria-label="refetch"
          onClick={() => handleRefresh()}
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

export default SearchBar;
