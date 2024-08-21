import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import updateRegistration from "~/services/api/updateRegistration";
import deleteRegistration from "~/services/api/deleteRegistration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

const labelOfButtons = {
  [RegistrationStatus.REVIEW]: "Revisar novamente",
  [RegistrationStatus.APPROVED]: "Aprovar",
  [RegistrationStatus.REPROVED]: "Reprovar",
};

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const updateStatusCard = async (status: string) => {
    const newRegistration = { ...props.data, status };
    await updateRegistration(newRegistration);
  };

  const deleteCard = async (id: number) => {
    await deleteRegistration(id)
  }

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === RegistrationStatus.REVIEW && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => updateStatusCard(RegistrationStatus.REPROVED)}
          >
            {labelOfButtons[RegistrationStatus.REPROVED]}
          </ButtonSmall>
        )}
        {props.data.status === RegistrationStatus.REVIEW && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => updateStatusCard(RegistrationStatus.APPROVED)}
          >
            {labelOfButtons[RegistrationStatus.APPROVED]}
          </ButtonSmall>
        )}
        {[RegistrationStatus.APPROVED, RegistrationStatus.REPROVED].includes(
          props.data.status
        ) && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => updateStatusCard(RegistrationStatus.REVIEW)}
          >
            {labelOfButtons[RegistrationStatus.REVIEW]}
          </ButtonSmall>
        )}

        <HiOutlineTrash onClick={() => deleteCard(props.data.id)}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
