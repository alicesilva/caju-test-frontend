import React, { useState } from "react";
import { renderHook } from "@testing-library/react-hooks";

import {
  RegistrationDataContextProvider,
  useFecthData,
} from "./RegistrationData";
import { ReactNode } from "react";

type ModalContextProviderProps = {
  children: ReactNode;
};
const getContext = () => {
  const wrapper = ({ children }: ModalContextProviderProps) => (
    <RegistrationDataContextProvider>
      {children}
    </RegistrationDataContextProvider>
  );

  return wrapper;
};

describe("RegistrationDataContext", () => {
  test("should return initial data when useConfirmationModal", () => {
    const wrapper = getContext();

    console.log(wrapper)
    const { result } = renderHook(() => useFecthData(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        isLoading: true,
        registrations: [],
      })
    );
  });

  test("should return initial data when useConfirmationModal", () => {
    const wrapper = getContext();
    const { result } = renderHook(() => useFecthData(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        isLoading: true,
        registrations: [],
      })
    );
  });
});
