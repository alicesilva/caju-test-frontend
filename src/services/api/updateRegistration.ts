import {api} from '~/clients/registrationsClient';
import { Registration } from '~/types/Registration';

async function updateRegistration(registration: Registration): Promise<Registration | null>  {
    try {
        const response = await api.put(`/registrations/${registration.id}`, registration);
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default updateRegistration