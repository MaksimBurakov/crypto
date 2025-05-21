import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/useModalStore';
import { LoginForm } from '../LoginForm/LoginForm';
import styles from './LoginModal.module.scss';

export const LoginModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, closeModal]);

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => closeModal()}>
          X
        </button>
        <LoginForm />
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
