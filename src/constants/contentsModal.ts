import {Actions} from '~/types/Actions'
export const contentsModal = {
    [Actions.DELETE]: {
        title: "Tem certeza que deseja excluir esta admissão?",
        subtitle: "Ao excluir não é possível recuperá-la.",
        isConfirmButtonLabel: "Sim, desejo excluir",
        isNotConfirmButtonLabel: "Cancelar"
    },
    [Actions.UPDATE]: {
        title: "Tem certeza que deseja atualizar o status da admissão?",
        subtitle: "Ao atualizar é possível realizar uma nova revisão.",
        isConfirmButtonLabel: "Sim, desejo atualizar",
        isNotConfirmButtonLabel: "Cancelar"
    }
}