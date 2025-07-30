import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import logoTeddy from '../../assets/img/teddy-loggo.png'
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="container-sidebar-logo">
        <img src={logoTeddy} alt="Logo Teddy" className="sidebar-logo" />
      </div>

      <nav className="menu-sidebar">
        <ul>
          <li>
            <HomeIcon />
            <span>Home</span>
          </li>
          <li className="active-sidebar-item">
            <PersonIcon />
            <span>Clientes</span>
          </li>
          <li>
            <VerifiedUserIcon />
            <span>Clientes selecionados</span>
          </li>
        </ul>
      </nav>

      {isOpen &&
        <div className='close-btn-container'>
          <button className="close-btn" onClick={onClose}>
            <ArrowBackIcon className='arrom-back-icon-sidebar' />
          </button>
        </div>
      }
    </aside>
  );
};
