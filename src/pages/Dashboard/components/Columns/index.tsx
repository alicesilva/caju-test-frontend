import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import { useFecthData } from "~/hooks/useFetchData";

const allColumns = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];


const Collumns = () => {
  const { registrations } = useFecthData();
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations.map((registration) => {
                  return (
                    registration.status === collum.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    )
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
