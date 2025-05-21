import { useState, useEffect } from 'react';
import type { IAsset } from '../../types/assetTypes';
import { CryptoRow } from '../CryptoTableRow/CryptoRow';
import { useSortedAssets } from '../../hooks/useSortedAssets';
import styles from './CryptoTable.module.scss';

interface ICryptoTableProps {
  assets: IAsset[];
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const CryptoTable = ({
  assets,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: ICryptoTableProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [tradeTypeMap, setTradeTypeMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setTradeTypeMap((prev) => {
      const updated = { ...prev };
      assets.forEach((asset) => {
        if (!updated[asset.id]) updated[asset.id] = 'Buy';
      });
      return updated;
    });
  }, [assets]);

  const sortedAssets = useSortedAssets(assets, sortBy, sortOrder);

  const sortOrderArrow = sortOrder === 'asc' ? '↑' : '↓';
  const sortOrderAscDesc = sortOrder === 'asc' ? 'desc' : 'asc';

  const handleSort = (criteria: 'name' | 'price') => {
    setSortOrder(sortBy === criteria ? sortOrderAscDesc : 'asc');
    setSortBy(criteria);
  };

  const handleTradeTypeChange = (assetId: string, selected: string) => {
    setTradeTypeMap((prev) => ({ ...prev, [assetId]: selected }));
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th onClick={() => handleSort('name')} className={styles.sortable}>
              Name {sortBy === 'name' ? sortOrderArrow : ''}
            </th>
            <th onClick={() => handleSort('price')} className={styles.sortable}>
              Price (USD) {sortBy === 'price' ? sortOrderArrow : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <CryptoRow
              key={asset.id}
              asset={asset}
              tradeType={tradeTypeMap[asset.id]}
              onTradeTypeChange={(selected) =>
                handleTradeTypeChange(asset.id, selected)
              }
            />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonsWrapper}>
        {hasNextPage && (
          <button
            className={styles.tableButton}
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
      </div>
    </div>
  );
};
