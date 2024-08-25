import { useConfirmationModal } from "~/components/contexts/ModalContext";
import * as S from "./styles";
import { IoMdClose } from "react-icons/io";
import ButtonPrimary from "../Buttons/ButtonPrimary";

const Modal = () => {
  const { setIsConfirm, setOpenModal, content } = useConfirmationModal();

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <IoMdClose onClick={() => setOpenModal(false)} size={24} />
        </S.Header>
        <S.Body>
          <S.Title>{content.title}</S.Title>
          <S.Subtitle>{content.subtitle}</S.Subtitle>
          <S.Actions>
            <S.AgreeAction>
              <ButtonPrimary onClick={() => setIsConfirm(true)}>{content.isConfirmButtonLabel}</ButtonPrimary>
            </S.AgreeAction>
            <S.DisagreeAction>
              <ButtonPrimary onClick={() => setOpenModal(false)}>{content.isNotConfirmButtonLabel}</ButtonPrimary >
            </S.DisagreeAction>
          </S.Actions>
        </S.Body>
      </S.Content>
    </S.Container>
  );
};

export default Modal;
