import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './AppLayout.module.scss';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </div>
  );
}
