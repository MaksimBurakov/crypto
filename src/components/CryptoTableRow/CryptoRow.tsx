import type { IAsset } from '../../types/assetTypes';
import { Dropdown } from '../DropDown/DropDown';
import styles from './CryptoRow.module.scss';

export const CryptoRow = ({
  asset,
  tradeType,
  onTradeTypeChange,
}: {
  asset: IAsset;
  tradeType: string;
  onTradeTypeChange: (selected: string) => void;
}) => {
  return (
    <tr>
      <td className={styles.tableItem}>
        {asset.name} ({asset.symbol})
      </td>
      <td className={styles.tableItem}>
        {tradeType === 'Buy'
          ? asset.metrics?.market_data?.ohlcv_last_1_hour?.low?.toFixed(2) ??
            'N/A'
          : asset.metrics?.market_data?.ohlcv_last_1_hour?.high?.toFixed(2) ??
            'N/A'}
      </td>
      <td className={styles.tableItem}>
        <Dropdown options={['Buy', 'Sell']} onSelect={onTradeTypeChange} />
      </td>
    </tr>
  );
};
