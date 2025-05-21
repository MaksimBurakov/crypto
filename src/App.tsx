import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TradePage } from './pages/TradePage/TradePage';

import CryptoLayout from './layouts/Layout/AppLayout';
import { LoginModal } from './components/LoginModal/LoginModal';
import { useModalStore } from './store/useModalStore';
import './App.css';

function App() {
  const { isOpen } = useModalStore();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoLayout />}>
          <Route index element={<HomePage />} />
          <Route path="trade" element={<TradePage />} />
        </Route>
      </Routes>
      {isOpen && <LoginModal />}
    </Router>
  );
}

export default App;
