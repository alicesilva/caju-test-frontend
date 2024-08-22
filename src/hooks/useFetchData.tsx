import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";
import getRegistrations from "~/services/api/getRegistrations";
import { Registration } from "~/types/Registration";

const RegistrationDataContext = createContext({
  registrations: [] as Registration[],
  setRegistrations: React.Dispatch<React.SetStateAction<Registration[]>>,
  searchQuery: "",
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  isLoading: false,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
});

type Props = {
    children: ReactNode
}

function RegistrationDataContextProvider({ children }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      registrations,
      setRegistrations,
      searchQuery,
      setSearchQuery,
      isLoading,
      setIsLoading
    }),
    [registrations, searchQuery, isLoading]
  );

  useEffect(() => {
    setIsLoading(true);
    let cpf = null;
    if (searchQuery.length > 0) {
      cpf = deleteMaskCpf(searchQuery);
    }
    const fetchData = async () => {
      const data = await getRegistrations(cpf || undefined);
      setRegistrations(data);
    };

    fetchData();
    setIsLoading(false);
  }, [searchQuery, isLoading]);

  return (
    <RegistrationDataContext.Provider value={value}>{children}</RegistrationDataContext.Provider>
  )
};

function useFecthData(){
    return useContext(RegistrationDataContext)
};

export { RegistrationDataContextProvider, useFecthData}
