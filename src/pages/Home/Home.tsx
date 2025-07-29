import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import './Home.scss';

export default function Home() {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="home-container" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" className="title">
        Olá, seja bem-vindo!
      </Typography>

      <div className='home-input-buttom'>
        <TextField
          label="Digite o seu nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          className="submit-button"
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}