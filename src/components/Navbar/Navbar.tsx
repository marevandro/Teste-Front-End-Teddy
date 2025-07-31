import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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

  const isSmallScreen = useMediaQuery('(max-width:670px)');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (location.pathname === '/') return null;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="navbar-container">
        {!isSmallScreen && (
          <IconButton aria-label="menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}

        <img src={logoTeddy} alt="Logo Teddy" className="navbar-logo" />

        {!isSmallScreen ? (
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
              onClick={() => navigate('/clientes')}
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
        ) : (
          <Box className="navbar-mobile-menu">
            <Button
              aria-controls={anchorEl ? 'navbar-menu' : undefined}
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
              endIcon={<ArrowDropDownIcon />}
              variant="text"
              color="inherit"
            >
              Menu
            </Button>
            <Menu
              id="navbar-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MenuItem
                onClick={() => {
                  navigate('/clientes');
                  handleMenuClose();
                }}
                selected={location.pathname === '/clientes'}
              >
                Clientes
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/clientes');
                  handleMenuClose();
                }}
                selected={location.pathname === '/clientes'}
              >
                Clientes selecionados
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(clearUser());
                  navigate('/');
                  handleMenuClose();
                }}
              >
                Sair
              </MenuItem>
            </Menu>
          </Box>
        )}

        <Typography
          variant="body1"
          color="textSecondary"
          className={isSmallScreen ? 'navbar-user-small' : ''}
          style={{ marginLeft: 'auto' }}
        >
          Olá, <span className="title-user">{userName || 'Usuário'}</span>!
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
