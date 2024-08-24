import { api } from "~/clients/registrationsClient";

async function deleteRegistration(id: string): Promise<void> {
  try {
    await api.delete(`/registrations/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default deleteRegistration;
