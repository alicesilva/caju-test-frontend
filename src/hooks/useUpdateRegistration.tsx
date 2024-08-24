import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useConfirmationModal } from "~/components/contexts/ModalContext";
import { useFecthData } from "~/components/contexts/RegistrationData";
import { deleteElemFromArray } from "~/helpers/deleteElementFromArray";
import deleteRegistration from "~/services/api/deleteRegistration";
import updateRegistration from "~/services/api/updateRegistration";
import { Actions } from "~/types/Actions";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

function useUpdateRegistration(
  action: Actions,
  data: Registration,
  newStatus: RegistrationStatus,
) {
  const { setRegistrations, registrations } = useFecthData();
  const { setOpenModal, openModal, isConfirm, setIsConfirm } =
    useConfirmationModal();

  const updateStatusCard = async (status: RegistrationStatus) => {
    try {
      data.status = status;
      await updateRegistration(data);
      setRegistrations([...registrations]);
      toast.success("Status atualizado com sucesso.", {
        toastId: "update-sucess",
      });
    } catch (error) {
      toast.error("Erro ao atualizar status.", { toastId: "update-error" });
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await deleteRegistration(id);
      const newRegistration = deleteElemFromArray(registrations, data);
      setRegistrations([...newRegistration]);
      toast.success("Admissão excluída com sucesso.", {
        toastId: "delete-success",
      });
    } catch (error) {
      toast.error("Erro ao deletar admissão.", { toastId: "delete-error" });
    }
  };

  useEffect(() => {
    if (isConfirm && openModal) {
      if (action === Actions.DELETE) {
        deleteCard(data.id || "");
      } else if (action === Actions.UPDATE) {
        updateStatusCard(newStatus);
      }

      setIsConfirm(false);
      setOpenModal(false);
    }
  }, [isConfirm]);
}

export default useUpdateRegistration;
