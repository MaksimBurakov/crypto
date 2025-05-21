import { useState, useEffect } from 'react';
import type { IAsset } from '../../types/assetTypes';
import { CryptoRow } from '../CryptoTableRow/CryptoRow';
import { useSortedAssets } from '../../hooks/useSortedAssets';
import styles from './CryptoTable.module.scss';

interface ICryptoTableProps {
  assets: IAsset[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CryptoTable = ({ assets, setPage }: ICryptoTableProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [tradeTypeMap, setTradeTypeMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setTradeTypeMap(
      Object.fromEntries(assets.map((asset) => [asset.id, 'Buy']))
    );
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
        <button
          className={styles.tableButton}
          onClick={() => setPage((prev) => prev - 1)}
        >
          &#60;
        </button>
        <button
          className={styles.tableButton}
          onClick={() => setPage((prev) => prev + 1)}
        >
          &#62;
        </button>
      </div>
    </div>
  );
};
