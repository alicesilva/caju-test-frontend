import {api} from '~/clients/registrationsClient';
import { Registration } from '~/types/Registration';

async function createRegistration(registration: Registration): Promise<void>  {
    try {
        await api.post('/registrations', registration);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export default createRegistration