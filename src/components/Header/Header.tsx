import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useModalStore } from '../../store/useModalStore'; // Import Zustand modal store
import styles from './Header.module.scss';

export const Header = () => {
  const { isLogged, user, logout } = useAuthStore();
  const { openModal } = useModalStore();

  const handleLogButton = () => {
    if (isLogged) {
      logout();
    } else {
      openModal();
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
          onClick={(e) => {
            if (!isLogged) {
              e.preventDefault();
              openModal();
            }
          }}
        >
          Trade
        </NavLink>
      </nav>

      <div className={styles.userActions}>
        <div className={styles.userInfo}>
          {isLogged && <p className={styles.userEmail}>{user}</p>}
          <button className={styles.logButton} onClick={handleLogButton}>
            {isLogged ? 'Log out' : 'Log in'}
          </button>
        </div>
      </div>
    </header>
  );
};
