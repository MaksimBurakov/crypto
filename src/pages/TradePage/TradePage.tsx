import { TradeForm } from '../../components/TradeForm/TradeForm';
import { fetchAssetSymbols } from '../../api/fetchAssets';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBanner } from '../../components/ErrorBanner/ErrorBanner';
import styles from './TradePage.module.scss';

export const TradePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['assetsSymbols'],
    queryFn: fetchAssetSymbols,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorBanner message="Error getting asset symbols" />;

  return (
    <div className={styles.tradePageWrapper}>
      <TradeForm symbols={data} />
    </div>
  );
};
