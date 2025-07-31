import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoTeddy from '../../assets/img/teddy-loggo.png';
import './Navbar.scss';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearUser } from '../../features/user/userSlice';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state: RootState) => state.user.name);


  if (location.pathname === '/') return null;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="navbar-container">
        <IconButton aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <img src={logoTeddy} alt="Logo Teddy" className="navbar-logo" />

        <Box className="navbar-links">
          <Box
            className={location.pathname === '/clientes' ? 'navbar-link active' : 'navbar-link'}
            onClick={() => navigate('/clientes')}
            style={{ cursor: 'pointer' }}
          >
            Clientes
          </Box>
          <Box
            className={location.pathname === '/clients-selected' ? 'navbar-link active' : 'navbar-link'}
            onClick={() => navigate('/clients')}
            style={{ cursor: 'pointer' }}
          >
            Clientes selecionados
          </Box>
          <Box
            className={location.pathname === '/exit' ? 'navbar-link active' : 'navbar-link'}
            onClick={() => {
              dispatch(clearUser());
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            Sair
          </Box>
        </Box>
        <Typography variant="body1" color="textSecondary">
          Olá, <span className="title-user">{userName || 'Usuário'}</span>!
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
