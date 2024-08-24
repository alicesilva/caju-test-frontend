import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';
import useUpdateRegistration from '~/hooks/useUpdateRegistration'; // ajuste o caminho conforme necessário
import deleteRegistration from '~/services/api/deleteRegistration';
import updateRegistration from '~/services/api/updateRegistration';
import { useFecthData } from '~/components/contexts/RegistrationData';
import { useConfirmationModal } from '~/components/contexts/ModalContext';
import { deleteElemFromArray } from '~/helpers/deleteElementFromArray';
import { Actions } from '~/types/Actions';
import { Registration } from '~/types/Registration';
import { RegistrationStatus } from '~/types/RegistrationStatus';

// Mock das dependências
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('~/services/api/deleteRegistration', () => jest.fn());
jest.mock('~/services/api/updateRegistration', () => jest.fn());
jest.mock('~/components/contexts/RegistrationData', () => ({
  useFecthData: jest.fn(),
}));
jest.mock('~/components/contexts/ModalContext', () => ({
  useConfirmationModal: jest.fn(),
}));
jest.mock('~/helpers/deleteElementFromArray', () => ({
  deleteElemFromArray: jest.fn(),
}));

describe('useUpdateRegistration', () => {
  const mockRegistration: Registration = {
    id: '1',
    employeeName: 'John Doe',
    admissionDate: '2024-08-23',
    cpf: '12345678900',
    email: 'johndoe@example.com',
    status: RegistrationStatus.REVIEW,
  };

  const mockRegistrations: Registration[] = [mockRegistration];

  const setRegistrations = jest.fn();
  const setOpenModal = jest.fn();
  const setIsConfirm = jest.fn();
  const useFecthDataMock = useFecthData as jest.Mock;
  const useConfirmationModalMock = useConfirmationModal as jest.Mock;
  const deleteElemFromArrayMock = deleteElemFromArray as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    useFecthDataMock.mockReturnValue({
      registrations: mockRegistrations,
      setRegistrations,
    });

    useConfirmationModalMock.mockReturnValue({
      setOpenModal,
      openModal: true,
      isConfirm: true,
      setIsConfirm,
    });

    deleteElemFromArrayMock.mockReturnValue(mockRegistrations);
  });

  it('should update registration status and show success toast', async () => {
   // (updateRegistration as unknown as jest.Mock).mockResolvedValue(mockRegistration);

    const { result } = renderHook(() =>
      useUpdateRegistration(Actions.UPDATE, mockRegistration, RegistrationStatus.ACTIVE)
    );

    await act(async () => {
      expect(updateRegistration).toHaveBeenCalledWith({
        ...mockRegistration,
        status: RegistrationStatus.ACTIVE,
      });
      expect(setRegistrations).toHaveBeenCalledWith([...mockRegistrations]);
      expect(toast.success).toHaveBeenCalledWith('Status atualizado com sucesso.', { toastId: 'update-sucess' });
    });
  });

  it('should delete registration and show success toast', async () => {
    (deleteRegistration as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useUpdateRegistration(Actions.DELETE, mockRegistration, RegistrationStatus.REVIEW)
    );

    await act(async () => {
      expect(deleteRegistration).toHaveBeenCalledWith(mockRegistration.id);
      expect(deleteElemFromArray).toHaveBeenCalledWith(mockRegistrations, mockRegistration);
      expect(setRegistrations).toHaveBeenCalledWith(mockRegistrations);
      expect(toast.success).toHaveBeenCalledWith('Admissão excluída com sucesso.', { toastId: 'delete-success' });
    });
  });

  it('should handle errors during update and delete operations', async () => {
    const mockError = new Error('Network Error');
    
    (updateRegistration as jest.Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() =>
      useUpdateRegistration(Actions.UPDATE, mockRegistration, RegistrationStatus.ACTIVE)
    );
    
    await act(async () => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar status.', { toastId: 'update-error' });
    });

    (deleteRegistration as jest.Mock).mockRejectedValue(mockError);
    const { result: resultDelete } = renderHook(() =>
      useUpdateRegistration(Actions.DELETE, mockRegistration, RegistrationStatus.REVIEW)
    );

    await act(async () => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao deletar admissão.', { toastId: 'delete-error' });
    });
  });
});
