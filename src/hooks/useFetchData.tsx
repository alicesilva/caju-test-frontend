import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";
import getRegistrations from "~/services/api/getRegistrations";
import { Registration } from "~/types/Registration";

const RegistrationDataContext = createContext({
  registrations: [] as Registration[],
  setRegistrations: React.Dispatch<React.SetStateAction<Registration[]>>,
  searchQuery: "" as string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
});

type Props = {
    children: ReactNode
}

function RegistrationDataContextProvider({ children }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(
    () => ({
      registrations,
      setRegistrations,
      searchQuery,
      setSearchQuery,
    }),
    [registrations, searchQuery]
  );

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
    <RegistrationDataContext.Provider value={value}>{children}</RegistrationDataContext.Provider>
  )
};

function useFecthData(){
    return useContext(RegistrationDataContext)
};

export { RegistrationDataContextProvider, useFecthData}
