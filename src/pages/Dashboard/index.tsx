import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect, useState } from "react";
import getRegistrations from "~/services/api/getRegistrations";
import { Registration } from "~/types/Registration";



const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegistrations();
      setRegistrations(data);
    }

    fetchData();
  });

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
