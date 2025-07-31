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

export default function Clients() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [clientsPerPage, setClientsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);


  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);


  const totalClients = clients.length;
  const totalPages = Math.ceil(totalClients / clientsPerPage);

  const startIndex = (currentPage - 1) * clientsPerPage;
  const currentClients = clients.slice(startIndex, startIndex + clientsPerPage);

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
      const response = await getAllClientsApi();
      setClients(response);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllClients()
  }, []);

  return (
    <DefaultLayout>
      <div className="clients-container">
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
                    onClick={() => toggleItemSelection(client.id)}
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
          onClick={() => handleOpenModal('create')}
        >
          Criar cliente
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
