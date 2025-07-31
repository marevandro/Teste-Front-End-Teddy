import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Home.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setName } from '../../features/user/userSlice';

type FormData = {
  name: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (data: FormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    dispatch(setName(data.name));
    navigate('/clientes');
  };

  return (
    <form className="home-container" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" className="title">
        Olá, seja bem-vindo!
      </Typography>

      <div className='home-input-buttom'>
        <TextField
          label="Digite seu nome"
          {...register('name', {
            required: 'Nome é obrigatório',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{3,}$/,
              message: 'Use apenas letras (mín. 3 caracteres)'
            }
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          className="submit-button"
          fullWidth
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}