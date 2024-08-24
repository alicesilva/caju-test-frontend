import { useConfirmationModal } from "~/components/contexts/ModalContext";
import Button from "../Buttons";
import * as S from "./styles";
import { IoMdClose } from "react-icons/io";

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
            <S.AgreeAction onClick={() => setIsConfirm(true)}>
              <Button>{content.isConfirmButtonLabel}</Button>
            </S.AgreeAction>
            <S.DisagreeAction onClick={() => setOpenModal(false)}>
              <Button>{content.isNotConfirmButtonLabel}</Button>
            </S.DisagreeAction>
          </S.Actions>
        </S.Body>
      </S.Content>
    </S.Container>
  );
};

export default Modal;
