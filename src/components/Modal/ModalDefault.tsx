import React, { useEffect, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import './ModalDefault.scss';

export interface ClientData {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ModalDefaultProps {
  open: boolean;
  onClose: () => void;
  type: 'create' | 'edit' | 'delete';
  client?: ClientData;
  onConfirm: (data: ClientData) => void;
}

export default function ModalDefault({
  open,
  onClose,
  type,
  client = { id: 0, name: '', salary: 0, companyValuation: 0 },
  onConfirm
}: ModalDefaultProps) {
  const [formData, setFormData] = React.useState(client);

  useEffect(() => {
    if (open) {
      setFormData(client);
    }
  }, [open, client]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' || name === 'companyValuation' ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
    onClose();
  };

  const getModalTitle = (type: 'create' | 'edit' | 'delete'): string => {
    switch (type) {
      case 'create':
        return 'Criar Cliente'
      case 'edit':
        return 'Editar Cliente'
      case 'delete':
        return 'Excluir Cliente'
      default:
        return 'Cliente'
    }
  };



  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-default">
        <div className='modal-default-header'>
          <Typography variant="h6" component="h2" className='modal-default-title'>
            {getModalTitle(type)}:
          </Typography>

          <CloseIcon onClick={onClose} />
        </div>

        {type !== 'delete' ? (
          <div className="modal-form">
            <TextField
              label="Digite o nome:"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Digite o salário:"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Digite o valor da empresa:"
              name="company"
              value={formData.companyValuation}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className="submit-button-modal"
              onClick={handleSubmit}
            >
              {getModalTitle(type)}
            </Button>
          </div>
        ) : (
          <div className="modal-delete">
            <p>Você está prestes a excluir o cliente: <span className="title-user">Márcio</span></p>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className="submit-button-modal"
              onClick={handleSubmit}
            >
              {getModalTitle(type)}
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
}