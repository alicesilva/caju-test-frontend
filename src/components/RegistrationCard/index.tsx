import React, { useState } from "react";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { RegistrationStatus } from "~/types/RegistrationStatus";
import { useConfirmationModal } from "~/components/contexts/ModalContext";
import { Actions } from "~/types/Actions";
import { contentsModal } from "~/constants/contentsModal";
import useUpdateRegistration from "~/hooks/useUpdateRegistration";
import StatusButton from "~/components/Buttons/StatusButton.tsx";
import { HandleClickProps, RegistrationDataProps } from "~/types/PropsComponents";

const labelOfButtons = {
  [RegistrationStatus.REVIEW]: "Revisar novamente",
  [RegistrationStatus.APPROVED]: "Aprovar",
  [RegistrationStatus.REPROVED]: "Reprovar",
};



const RegistrationCard = (props: RegistrationDataProps

) => {
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
              <StatusButton
                bgcolor="rgb(255, 145, 154)"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.REPROVED,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.REPROVED]}
              </StatusButton>
            )}
            {props.data.status === RegistrationStatus.REVIEW && (
              <StatusButton
                bgcolor="rgb(155, 229, 155)"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.APPROVED,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.APPROVED]}
              </StatusButton>
            )}
            {[
              RegistrationStatus.APPROVED,
              RegistrationStatus.REPROVED,
            ].includes(props.data.status) && (
              <StatusButton
                bgcolor="#ff8858"
                onClick={() =>
                  handleClick({
                    action: Actions.UPDATE,
                    status: RegistrationStatus.REVIEW,
                  })
                }
              >
                {labelOfButtons[RegistrationStatus.REVIEW]}
              </StatusButton>
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
