import {api} from '~/clients/registrationsClient';
import { Registration } from '~/types/Registration';

async function getRegistrations(cpf?: string): Promise<Registration[]>  {
    const params = cpf ? { cpf } : {};
    try {
        const response = await api.get('/registrations', {params});
        return  response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default getRegistrations