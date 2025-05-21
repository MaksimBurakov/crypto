import { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';

interface IDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const Dropdown = ({ options, onSelect }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected} ▼
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
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
