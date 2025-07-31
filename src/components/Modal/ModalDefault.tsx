import React, { useEffect, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import './ModalDefault.scss';
import Loading from '../Loading/Loading';

export interface ClientDataProps {
  id: number;
  name: string;
  salary: string;
  companyValuation: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ModalDefaultProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  type: 'create' | 'edit' | 'delete';
  client?: ClientDataProps;
  onConfirm: (data: ClientDataProps) => void;
}

export default function ModalDefault({
  open,
  isLoading,
  onClose,
  type,
  client = { id: 0, name: '', salary: '', companyValuation: '' },
  onConfirm
}: ModalDefaultProps) {
  const [formData, setFormData] = React.useState(client);

  useEffect(() => {
    if (open) {
      setFormData({
        id: client?.id ?? 0,
        name: client?.name ?? '',
        salary: client?.salary ?? 0,
        companyValuation: client?.companyValuation ?? 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
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
        <div className='modal-default-header' style={isLoading ? { height: '50vh', borderRadius: '3%'} : {}}>
          <Typography variant="h6" component="h2" className='modal-default-title'>
            {getModalTitle(type)}:
          </Typography>

          <CloseIcon onClick={onClose} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
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
                  name="companyValuation"
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
                <p>Você está prestes a excluir o cliente: <span className="title-user">{formData.name}</span></p>
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
          </div>
        )}
      </Box>
    </Modal>
  );
}