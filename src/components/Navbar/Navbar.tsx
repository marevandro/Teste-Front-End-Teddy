import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoTeddy from '../../assets/img/teddy-loggo.png'
import './Navbar.scss';


interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const isActive = {
    clients: true,
    selected: false,
    exit: false
  };

  if (location.pathname === '/') return null;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className='navbar-container'>
        <IconButton
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <img src={logoTeddy} alt="Logo Teddy" className="navbar-logo" />

        <Box className="navbar-links">
          <Box
            className={isActive.clients ? 'navbar-link active' : 'navbar-link'}
          >
            Clientes
          </Box>
          <Box
            className={isActive.selected ? 'navbar-link active' : 'navbar-link'}
          >
            Clientes selecionados
          </Box>
          <Box
            className={isActive.exit ? 'navbar-link active' : 'navbar-link'}
          >
            Sair
          </Box>
        </Box>
        <Typography variant="body1" color="textSecondary">
          Olá, <span className="navbar-user">Usuário!</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
