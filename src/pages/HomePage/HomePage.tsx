import { useInfiniteQuery } from '@tanstack/react-query';
import { CryptoTable } from '../../components/CryptoTable/CryptoTable';
import { fetchAssets } from '../../api/fetchAssets';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBanner } from '../../components/ErrorBanner/ErrorBanner';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorBanner message="Error getting assets data" />;

  const allAssets = data?.pages.flat() || [];

  return (
    <div className={styles.homePage}>
      <CryptoTable
        assets={allAssets}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
