import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import { useFecthData } from "~/hooks/useFetchData";
import { ColorRing } from "react-loader-spinner";

const allColumns = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

const Collumns = () => {
  const { registrations, isLoading } = useFecthData();

  return (
    <>
      {isLoading ? (
        <S.Spinner data-testid="loading-spinner">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#ff7500", "#e80537", "#ff7500", "#e80537", "#e80537"]}
          />
        </S.Spinner>
      ) : (
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
      )}
    </>
  );
};
export default Collumns;
