import React, { useState } from "react";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { RegistrationStatus } from "~/types/RegistrationStatus";
import { useConfirmationModal } from "~/components/contexts/ModalContext";
import { Registration } from "~/types/Registration";
import { Actions } from "~/types/Actions";
import { contentsModal } from "~/constants/contentsModal";
import useUpdateRegistration from "~/hooks/useUpdateRegistration";

const labelOfButtons = {
  [RegistrationStatus.REVIEW]: "Revisar novamente",
  [RegistrationStatus.APPROVED]: "Aprovar",
  [RegistrationStatus.REPROVED]: "Reprovar",
};

type Props = {
  data: Registration;
};

type HandleClickProps = {
  action: Actions;
  status?: RegistrationStatus;
};

const RegistrationCard = (props: Props) => {
  const { setOpenModal, setContent } = useConfirmationModal();
  const [action, setAction] = useState<Actions>(Actions.DEFAULT);
  const [newStatus, setNewStatus] = useState<RegistrationStatus>(
    props.data.status
  );

  const handleClick = async (propsHandleClick: HandleClickProps) => {
    setAction(propsHandleClick.action);
    setNewStatus(propsHandleClick.status || props.data.status);

    if (propsHandleClick.action === Actions.DELETE) {
      setContent(contentsModal.DELETE);
    } else if (propsHandleClick.action === Actions.UPDATE) {
      setContent(contentsModal.UPDATE);
    }

    setOpenModal(true);
  };

  useUpdateRegistration(action, props.data, newStatus);

  return (
    <>
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
          <S.ActionsStatus>
            {props.data.status === RegistrationStatus.REVIEW && (
              <ButtonSmall
                bgcolor="rgb(255, 145, 154)"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.REPROVED,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.REPROVED]}
              </ButtonSmall>
            )}
            {props.data.status === RegistrationStatus.REVIEW && (
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.APPROVED,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.APPROVED]}
              </ButtonSmall>
            )}
            {[
              RegistrationStatus.APPROVED,
              RegistrationStatus.REPROVED,
            ].includes(props.data.status) && (
              <ButtonSmall
                bgcolor="#ff8858"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.REVIEW,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.REVIEW]}
              </ButtonSmall>
            )}
          </S.ActionsStatus>

          <div>
            <HiOutlineTrash data-testid="delete-icon"
              onClick={() => handleClick({ action: Actions.DELETE })}
            />
          </div>
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
