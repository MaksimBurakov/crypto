import { useState, type ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import tradeIcon from '../../assets/exchange_icon.svg';
import { Dropdown } from '../DropDown/DropDown';
import { fetchExchangeRate } from '../../api/fetchExchangeRates';
import styles from './TradeForm.module.scss';

interface ITradeFormProps {
  symbols: string[];
}

export const TradeForm = ({ symbols }: ITradeFormProps) => {
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);

  const {
    data: convertedAmount,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['exchangeRate', selectedCrypto, cryptoAmount, isCryptoToFiat],
    queryFn: () =>
      fetchExchangeRate({
        from: isCryptoToFiat ? selectedCrypto : 'USD',
        to: isCryptoToFiat ? 'USD' : selectedCrypto,
        amount: cryptoAmount,
      }),
    enabled: cryptoAmount > 0,
  });

  const getConvertedValue = () => {
    if (isFetching) return 'Loading...';
    if (isError) return 'Error';
    return convertedAmount ?? '';
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCryptoAmount(+value);
    }
  };
  const handleSwap = () => {
    setIsCryptoToFiat(!isCryptoToFiat);
    setCryptoAmount(convertedAmount ?? 0);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h3>Trade form</h3>
      <div className={styles.inputWrapper}>
        <input
          value={cryptoAmount}
          onChange={handleAmountChange}
          className={styles.input}
        />
        <div className={styles.inputInfo}>
          {isCryptoToFiat ? (
            <Dropdown options={symbols} onSelect={setSelectedCrypto} />
          ) : (
            <span>USD</span>
          )}
        </div>
      </div>
      <button
        type="button"
        className={styles.changeButton}
        onClick={handleSwap}
      >
        <img src={tradeIcon} alt="tradeIcon" className={styles.tradeIcon} />
      </button>
      <div className={styles.inputWrapper}>
        <input value={getConvertedValue()} className={styles.input} disabled />
        <span className={styles.inputInfo}>
          {isCryptoToFiat ? 'USD' : selectedCrypto}
        </span>
      </div>
    </form>
  );
};
