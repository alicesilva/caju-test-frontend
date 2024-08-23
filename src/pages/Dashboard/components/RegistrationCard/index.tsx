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
import { useFecthData } from "~/hooks/useFetchData";
import { useConfirmationModal } from "~/hooks/useConfirmationModal";
import { Registration } from "~/types/Registration";
import Modal from "~/components/Modal";
import { Actions } from "~/types/Actions";
import { contentsModal } from "~/constants/contentsModal";
import { deleteElemFromArray } from "~/helpers/deleteElementFromArray";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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
  const { setRegistrations, registrations } = useFecthData();
  const { setOpenModal, openModal, setContent, isConfirm, setIsConfirm } =
  useConfirmationModal();
  const [action, setAction] = useState("");
  const [newStatus, setNewStatus] = useState(props.data.status);

  const handleClick = async (propsHandleClick: HandleClickProps) => {
    setAction(propsHandleClick.action);
    setOpenModal(true);
    setNewStatus(propsHandleClick.status || props.data.status);

    if (propsHandleClick.action === Actions.DELETE) {
      setContent(contentsModal.DELETE);
    } else {
      setContent(contentsModal.UPDATE);
    }
  };

  useEffect(() => {
    if (isConfirm && openModal) {
      if (action === Actions.DELETE) {
        deleteCard(props.data.id);
      } else {
        updateStatusCard(newStatus);
      }

      setIsConfirm(false);
      setOpenModal(false);
    }
  }, [isConfirm]);

  const updateStatusCard = async (status: RegistrationStatus) => {
    try {
      props.data.status = status;
      setRegistrations([...registrations]);
      await updateRegistration(props.data);
      toast.success("Status atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar status.");
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await deleteRegistration(id);
      const newRegistration = deleteElemFromArray(registrations, props.data);
      setRegistrations([...newRegistration]);
      toast.success("Admissão excluída com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar admissão.");
    }
  };

  return (
    <>
      {openModal && <Modal />}
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
          {[RegistrationStatus.APPROVED, RegistrationStatus.REPROVED].includes(
            props.data.status
          ) && (
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

          <HiOutlineTrash
            onClick={() => handleClick({ action: Actions.DELETE })}
          />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
