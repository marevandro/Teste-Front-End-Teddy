import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';

import Loading from '../Loading/Loading';
import { formatToBRL, parseBRLToNumber } from '../../utils/formatters';
import './ModalDefault.scss';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ClientDataProps>({
    mode: 'onBlur',
    defaultValues: client
  });

  const salaryValue = watch('salary');
  const companyValuationValue = watch('companyValuation');

  useEffect(() => {
    if (open) {
      const formattedClient = {
        ...client,
        salary: client.salary ? formatToBRL(client.salary) : '',
        companyValuation: client.companyValuation ? formatToBRL(client.companyValuation) : ''
      };
      reset(formattedClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  const getModalTitle = (type: 'create' | 'edit' | 'delete'): string => {
    switch (type) {
      case 'create':
        return 'Criar Cliente';
      case 'edit':
        return 'Editar Cliente';
      case 'delete':
        return 'Excluir Cliente';
      default:
        return 'Cliente';
    }
  };

  const handleMoneyChange = (field: 'salary' | 'companyValuation', value: string) => {
    const numericValue = parseBRLToNumber(value);
    const formattedValue = formatToBRL(numericValue);
    setValue(field, formattedValue, { shouldValidate: true });
  };

  const onSubmit = (data: ClientDataProps) => {
    const payload = {
      ...data,
      salary: parseBRLToNumber(data.salary),
      companyValuation: parseBRLToNumber(data.companyValuation)
    };
    onConfirm(payload);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-default">
        <div className='modal-default-header' style={isLoading ? { height: '50vh', borderRadius: '3%' } : {}}>
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
              <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Digite o nome:"
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'Mínimo de 3 caracteres'
                    }
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Digite o salário:"
                  value={salaryValue}
                  onChange={(e) => handleMoneyChange('salary', e.target.value)}
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Digite o valor da empresa:"
                  value={companyValuationValue}
                  onChange={(e) => handleMoneyChange('companyValuation', e.target.value)}
                  error={!!errors.companyValuation}
                  helperText={errors.companyValuation?.message}
                  fullWidth
                  margin="normal"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className="submit-button-modal"
                >
                  {getModalTitle(type)}
                </Button>
              </form>
            ) : (
              <div className="modal-delete">
                <p>Você está prestes a excluir o cliente: <span className="title-user">{client.name}</span></p>
                <p>Salário: {formatToBRL(client.salary)}</p>
                <p>Valor da empresa: {formatToBRL(client.companyValuation)}</p>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className="submit-button-modal"
                  onClick={() => onConfirm(client)}
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