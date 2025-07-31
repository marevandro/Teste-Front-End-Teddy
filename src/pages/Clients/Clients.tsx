import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ModalDefault from '../../components/Modal/ModalDefault';
import DefaultLayout from '../../layout/DefaultLayout';
import Loading from '../../components/Loading/Loading';
import {
  getAllClientsApi,
  createCustomerApi,
  updateCustomerIdApi,
  deleteCustomerIdApi,
} from '../../api/clients';
import type { ClientDataProps } from '../../components/Modal/ModalDefault';
import { formatToBRL } from '../../utils/formatters';
import './Clients.scss';
import { SnackbarAlert } from '../../components/SnackbarAlert/SnackbarAlert';

export default function Clients() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientDataProps[]>([]);
  const [clientsPerPage, setClientsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedClient, setSelectedClient] = useState<ClientDataProps | null>(null);
  const [selectedItems, setSelectedItems] = useState<ClientDataProps['id'][]>([]);

  const totalClients: number = clients.length;
  const totalPages: number = Math.ceil(totalClients / clientsPerPage);
  const startIndex: number = (currentPage - 1) * clientsPerPage;
  const currentClients: ClientDataProps[] = clients.slice(startIndex, startIndex + clientsPerPage);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleOpenModal = (type: 'create' | 'edit' | 'delete', client?: ClientDataProps) => {
    setModalType(type);
    setSelectedClient(client || null);
    setModalOpen(true);
  };

  const handleConfirm = async (data: ClientDataProps) => {
    try {
      setIsLoading(true);

      const payload = {
        name: data.name,
        salary: parseFloat(data.salary),
        companyValuation: parseFloat(data.companyValuation),
      };

      if (modalType === 'create') {
        const newClient = await createCustomerApi(payload);
        setClients(prev => [...prev, {
          ...newClient,
          salary: newClient.salary.toString(),
          companyValuation: newClient.companyValuation.toString()
        }]);
      }

      else if (modalType === 'edit' && selectedClient) {
        const updatedClient = await updateCustomerIdApi(selectedClient.id.toString(), payload);
        setClients(prev => prev.map(client =>
          client.id === updatedClient.id
            ? {
              ...updatedClient,
              salary: updatedClient.salary.toString(),
              companyValuation: updatedClient.companyValuation.toString()
            }
            : client
        ));
      }

      else if (modalType === 'delete' && selectedClient) {
        await deleteCustomerIdApi(selectedClient.id.toString());
        setClients(prev => prev.filter(client => client.id !== selectedClient.id));
      }

      setSnackbarMessage(
        modalType === 'create' ? 'Cliente criado com sucesso!' :
          modalType === 'edit' ? 'Cliente atualizado com sucesso!' :
            'Cliente excluído com sucesso!'
      );
      setSnackbarOpen(true);

      setModalOpen(false);
    } catch (error) {
      console.error('Erro:', error);
      setSnackbarMessage('Erro ao processar a operação!');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedOrModalCreate = () => {
    if (selectedItems.length > 0) {
      console.log('Clientes selecionados:', selectedItems);
    } else {
      handleOpenModal('create');
    }
  };

  const toggleItemSelection = (clientId: number) => {
    setSelectedItems(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const getAllClients = async () => {
    try {
      setIsLoading(true);
      const response = await getAllClientsApi();
      const converted = response.map(client => ({
        ...client,
        salary: client.salary.toString(),
        companyValuation: client.companyValuation.toString(),
      }));
      setClients(converted)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllClients()
  }, []);

  return (
    <DefaultLayout>
      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarMessage.includes('Erro') ? 'error' : 'success'}
      />

      <div className="clients-container">
        {isLoading && <Loading />}
        <div className="clients-header">
          <p><strong>{totalClients}</strong> clientes encontrados:</p>
          <div className="per-page">
            <label>Clientes por página:</label>
            <select value={clientsPerPage} onChange={handleChangePerPage}>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>

        {totalClients === 0 ? (
          <div className="no-clients-message">
            <h2>Não existem clientes</h2>
          </div>
        ) : (<>
          <div className="clients-grid">
            {currentClients.map((client) => (
              <div
                className={`client-card ${selectedItems.includes(client.id) ? 'selected' : ''}`}
                key={client.id}
              >
                <h3>{client.name}</h3>
                <p>Salário: {formatToBRL(client.salary)}</p>
                <p>Empresa: {formatToBRL(client.companyValuation)}</p>
                <div className="card-actions">
                  <button
                    title={selectedItems.includes(client.id) ? "Remover" : "Adicionar"}
                    onClick={() => { toggleItemSelection(client.id); console.log(selectedItems) }}
                  >
                    {selectedItems.includes(client.id) ? <CloseIcon /> : <AddIcon />}
                  </button>
                  <button onClick={() => handleOpenModal('edit', client)}>
                    <ModeEditIcon />
                  </button>
                  <button className="delete" onClick={() => handleOpenModal('delete', client)}>
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>)}
        <button
          className={`create-button ${clients.length === 0 ? 'empty' : ''}`}
          onClick={handleSelectedOrModalCreate}
        >
          {selectedItems.length > 0 ? 'Salvar clientes selecionados' : 'Criar cliente'}
        </button>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <ModalDefault
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        client={selectedClient || undefined}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />

    </DefaultLayout >
  );
}
