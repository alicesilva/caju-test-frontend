import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { ContentModal } from "~/types/ContentModal";

const ModalContext = createContext({
  openModal: false,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  isConfirm: false,
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>,
  content: {
    title: "",
    subtitle: "",
    isConfirmButtonLabel: "",
    isNotConfirmButtonLabel: "",
  },
  setContent: React.Dispatch<React.SetStateAction<ContentModal>>,
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

function useConfirmModal() {
  return useContext(ModalContext);
}

export { ModalContextProvider, useConfirmModal };
