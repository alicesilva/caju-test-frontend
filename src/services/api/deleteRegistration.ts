import {api} from '~/clients/registrationsClient';

async function deleteRegistration(id: number): Promise<void>  {
    try {
        await api.delete(`/registrations/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export default deleteRegistration