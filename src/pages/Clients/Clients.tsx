import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ModalDefault from '../../components/Modal/ModalDefault';
import type { ClientData } from '../../components/Modal/ModalDefault';
import DefaultLayout from '../../layout/DefaultLayout';


import './Clients.scss';
import { getAllClientsApi } from '../../api/clients';
import { formatToBRL } from '../../utils/formatters';
import Loading from '../../components/Loading/Loading';

export default function Clients() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [clientsPerPage, setClientsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [selectedItems, setSelectedItems] = useState<ClientData['id'][]>([]);

  const totalClients: number = clients.length;
  const totalPages: number = Math.ceil(totalClients / clientsPerPage);
  const startIndex: number = (currentPage - 1) * clientsPerPage;
  const currentClients: ClientData[] = clients.slice(startIndex, startIndex + clientsPerPage);

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleOpenModal = (type: 'create' | 'edit' | 'delete', client?: ClientData) => {
    setModalType(type);
    setSelectedClient(client || null);
    setModalOpen(true);
  };

  const handleConfirm = (data: ClientData) => {
    if (modalType === 'create') {
      console.log('Criar cliente:', data);
    } else if (modalType === 'edit') {
      console.log('Editar cliente:', data);
    } else {
      console.log('Excluir cliente:', data);
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
      setClients(response);
    } catch (error) {
       console.error('Erro ao buscar clientes:', error);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllClients()
  }, []);

  return (
    <DefaultLayout>
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
                  <button onClick={() => handleOpenModal('edit')}>
                    <ModeEditIcon />
                  </button>
                  <button className="delete" onClick={() => handleOpenModal('delete')}>
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>)}

        <button
          className={`create-button ${clients.length === 0 ? 'empty' : ''}`}
          onClick={() => !selectedItems ? handleOpenModal('create') : console.log('Clientes selecionados')}
        >
          {!selectedItems.length ? 'Criar cliente' : 'Salvar clientes selecionados'}
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
      />

    </DefaultLayout>
  );
}
