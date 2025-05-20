import { useState } from 'react';
import type { IAsset } from '../../types/assetTypes';
import { Dropdown } from '../DropDown/DropDown';
import styles from './CryptoTable.module.scss';

interface ICryptoTableProps {
  assets: IAsset[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CryptoTable = ({ assets, setPage }: ICryptoTableProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedAssets = [...assets].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc'
        ? (a.metrics?.market_data?.price_usd ?? 0) -
            (b.metrics?.market_data?.price_usd ?? 0)
        : (b.metrics?.market_data?.price_usd ?? 0) -
            (a.metrics?.market_data?.price_usd ?? 0);
    }
  });

  const handleSort = (criteria: 'name' | 'price') => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (criteria: 'name' | 'price') => {
    if (sortBy === criteria) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th onClick={() => handleSort('name')} className={styles.sortable}>
              Name {getSortIndicator('name')}
            </th>
            <th onClick={() => handleSort('price')} className={styles.sortable}>
              Price (USD) {getSortIndicator('price')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <tr key={asset.id}>
              <td className={styles.tableItem}>
                {asset.name} ({asset.symbol})
              </td>
              <td className={styles.tableItem}>
                {asset.metrics?.market_data?.price_usd?.toFixed(2) ?? 'N/A'}
              </td>
              <td className={styles.tableItem}>
                <Dropdown options={['Buy', 'Sell']} onSelect={() => {}} />
              </td>
            </tr>
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
