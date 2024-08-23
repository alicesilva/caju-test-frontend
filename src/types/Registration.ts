import { RegistrationStatus } from "./RegistrationStatus";

export type Registration = {
    id?: string;
    cpf: string;
    status: RegistrationStatus;
    admissionDate: string;
    email: string;
    employeeName: string;
}