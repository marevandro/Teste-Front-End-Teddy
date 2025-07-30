import React, { useState } from 'react';
import { clientsMock } from './mockClients';
import DefaultLayout from '../../layout/DefaultLayout';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Clients.scss';

export default function Clients() {
  const [clientsPerPage, setClientsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const totalClients = clientsMock.length;
  const totalPages = Math.ceil(totalClients / clientsPerPage);

  const startIndex = (currentPage - 1) * clientsPerPage;
  const currentClients = clientsMock.slice(startIndex, startIndex + clientsPerPage);

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

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

        <div className="clients-grid">
          {currentClients.map((client) => (
            <div className="client-card" key={client.id}>
              <h3>{client.name}</h3>
              <p>Salário: R${client.salary.toFixed(2)}</p>
              <p>Empresa: {client.company}</p>
              <div className="card-actions">
                <button title="Adicionar">
                  <AddIcon />
                </button>
                <button title="Editar">
                  <ModeEditIcon />
                </button>
                <button title="Excluir" className="delete">
                  <DeleteOutlineIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="create-button">Criar cliente</button>

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
    </DefaultLayout>
  );
}
