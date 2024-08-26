import { InputHTMLAttributes, ReactNode } from "react";
import { Registration } from "./Registration";
import { RegistrationStatus } from "./RegistrationStatus";
import { Actions } from "./Actions";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  bgcolor?: string;
};

export type ContextProviderProps = {
  children: ReactNode;
};
export type RegistrationDataProps = {
  data: Registration;
};

export type HandleClickProps = {
  action: Actions;
  status?: RegistrationStatus;
};

export type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;
