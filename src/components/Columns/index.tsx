import React from "react";
import * as S from "./styles";
import RegistrationCard from "~/components/RegistrationCard";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import { useFecthData } from "~/components/contexts/RegistrationData";
import Loading from "~/components/Loading";

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
        <Loading />
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
