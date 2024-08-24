import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { ModalContextProvider, useConfirmationModal } from "./ModalContext";
import { ReactNode } from "react";

type ModalContextProviderProps = {
  children: ReactNode;
};
const getContext = () => {
  const wrapper = ({ children }: ModalContextProviderProps) => (
    <ModalContextProvider> {children}</ModalContextProvider>
  );

  return wrapper;
};

describe("ModalContext", () => {
  test("should return initial data when useConfirmationModal", () => {
    const wrapper = getContext();
    const { result } = renderHook(() => useConfirmationModal(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        content: {
          isConfirmButtonLabel: "",
          isNotConfirmButtonLabel: "",
          subtitle: "",
          title: "",
        },
        isConfirm: false,
        openModal: false,
      })
    );
  });
});
