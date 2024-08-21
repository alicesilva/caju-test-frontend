import {api} from '~/clients/registrationsClient';
import { Registration } from '~/types/Registration';

async function getRegistrations(): Promise<Registration[]>  {
    try {
        const response = await api.get('/registrations');
        return  response.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export default getRegistrations