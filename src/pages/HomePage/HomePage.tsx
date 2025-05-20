import { useQuery } from '@tanstack/react-query';
import { CryptoTable } from '../../components/CryptoTable/CryptoTable';
import { useState } from 'react';
import { fetchAssets } from '../../api/fetchAssets';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBanner } from '../../components/ErrorBanner/ErrorBanner';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [page, setPage] = useState<number>(1);

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['assets', page],
    queryFn: () => fetchAssets(page.toString()),
    refetchInterval: 60000,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorBanner message="Error getting assets data" />;

  return (
    <div className={styles.homePage}>
      <CryptoTable assets={assets} setPage={setPage} />
    </div>
  );
};
