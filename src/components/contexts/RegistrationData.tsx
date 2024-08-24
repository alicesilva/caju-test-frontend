import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { deleteMaskCpf } from "~/helpers/deleteMaskCpf";
import getRegistrations from "~/services/api/getRegistrations";
import { Registration } from "~/types/Registration";

interface IRegistrationDataContext {
  registrations: Registration[];
  setRegistrations: Dispatch<SetStateAction<Registration[]>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

const RegistrationDataContext = createContext<IRegistrationDataContext>({
  registrations: [],
  setRegistrations: () => {},
  setSearchQuery: () => {},
  isLoading: false,
  setIsLoading: () => {},
  setRefetch: () => {},
});

type Props = {
  children: ReactNode;
};

function RegistrationDataContextProvider({ children }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const value = useMemo(
    () => ({
      registrations,
      setRegistrations,
      searchQuery,
      setSearchQuery,
      isLoading,
      setIsLoading,
      refetch,
      setRefetch,
    }),
    [registrations, searchQuery, isLoading, refetch]
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

    setTimeout(() => {
      fetchData().catch(() => toast.error("Erro ao carregar os registros.")).finally(() => setIsLoading(false));
    }, 300);
    setRefetch(false);
  }, [searchQuery, refetch]);

  return (
    <RegistrationDataContext.Provider value={value}>
      {children}
    </RegistrationDataContext.Provider>
  );
}

function useFecthData() {
  return useContext(RegistrationDataContext);
}

export { RegistrationDataContextProvider, useFecthData };
