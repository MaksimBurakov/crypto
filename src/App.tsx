import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TradePage } from './pages/TradePage/TradePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { LoginPrivateRoute } from './routes/LoginPrivateRoute';
import CryptoLayout from './pages/Layout/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<LoginPrivateRoute />}>
            <Route path="trade" element={<TradePage />} />
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
