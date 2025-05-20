import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import styles from './Header.module.scss';

export const Header = () => {
  const { isLogged, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogButton = () => {
    if (isLogged) {
      logout();
    } else {
      navigate('/login');
    }
  };
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/trade"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Trade
        </NavLink>
      </nav>
      <button className={styles.logButton} onClick={handleLogButton}>
        {isLogged ? 'Log out' : 'Log in'}
      </button>
    </header>
  );
};
