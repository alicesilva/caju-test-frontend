import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { ContentModal } from "~/types/ContentModal";

interface IModalContext {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  isConfirm: boolean,
  setIsConfirm: Dispatch<SetStateAction<boolean>>,
  content: ContentModal,
  setContent: Dispatch<SetStateAction<ContentModal>>,
}

const ModalContext = createContext<IModalContext>({
  openModal: false,
  setOpenModal: () => {},
  isConfirm: false,
  setIsConfirm: () => {},
  content: {
    title: "",
    subtitle: "",
    isConfirmButtonLabel: "",
    isNotConfirmButtonLabel: "",
  },
  setContent: () => {},
});

type ModalContextProviderProps = {
  children: ReactNode;
};

function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [content, setContent] = useState<ContentModal>({
    title: "",
    subtitle: "",
    isConfirmButtonLabel: "",
    isNotConfirmButtonLabel: "",
  });

  const value = useMemo(
    () => ({
      openModal,
      setOpenModal,
      isConfirm,
      setIsConfirm,
      content,
      setContent,
    }),
    [openModal, isConfirm, content]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function useConfirmationModal() {
  return useContext(ModalContext);
}

export { ModalContextProvider, useConfirmationModal };
