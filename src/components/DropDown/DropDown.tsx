import { useState } from 'react';
import styles from './Dropdown.module.scss';

interface IDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const Dropdown = ({ options, onSelect }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || '');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected} ▼
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options?.map((option) => (
            <li key={option} className={styles.dropdownItem}>
              <button type="button" onClick={() => selectOption(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
