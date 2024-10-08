import * as yup from "yup";
import { cpf } from "cpf-cnpj-validator";

export const schema = yup.object({
    employeeName: yup
    .string()
    .matches(/^(?!\d)[A-Za-z][A-Za-z]*(?:\s[A-Za-z]+)+$/, "Nome inválido, insira Nome e Sobrenome")
    .required("Nome é obrigatório."),
  email: yup
    .string()
    .email("E-mail inválido.")
    .required("E-mail é obrigatório."),
  cpf: yup
    .string()
    .required("CPF é obrigatório.")
    .test("is-valid-cpf", "Digite um CPF Valido", (value) =>
      cpf.isValid(value)
    ),
  date: yup.date().required("Data de admissão é obrigatório."),
});
