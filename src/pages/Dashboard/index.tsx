import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect, useState } from "react";
import getRegistrations from "~/services/api/getRegistrations";
import { Registration } from "~/types/Registration";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cpf = null;
    if (searchQuery.length > 0) {
      cpf = deleteMaskCpf(searchQuery);
    }
    const fetchData = async () => {
      const data = await getRegistrations(cpf || undefined);
      setRegistrations(data);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <S.Container>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
