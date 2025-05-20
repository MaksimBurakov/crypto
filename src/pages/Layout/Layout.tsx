import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Layout.module.scss';

export default function CryptoLayout() {
  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </div>
  );
}
