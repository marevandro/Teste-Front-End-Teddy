import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Clients from '../pages/Clients/Clients';
import NotFound from '../pages/NotFound/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clients />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
