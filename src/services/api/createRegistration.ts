import { api } from "~/clients/registrationsClient";
import { Registration } from "~/types/Registration";

async function createRegistration(registration: Registration): Promise<Registration | null> {
  try {
    const response = await api.post("/registrations", registration);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default createRegistration;
