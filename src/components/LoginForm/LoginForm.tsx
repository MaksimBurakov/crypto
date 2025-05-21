import { useState, type FormEvent } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useModalStore } from '../../store/useModalStore';
import { validateLoginForm } from './FormValidator';
import styles from './LoginForm.module.scss';

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  error: '',
};

export const LoginForm = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const { login } = useAuthStore();
  const { closeModal } = useModalStore();

  const handleFormChange = (
    field: keyof typeof INITIAL_FORM_STATE,
    value: string
  ) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validateLoginForm(form);
    if (errorMessage) {
      setForm((prevForm) => ({ ...prevForm, error: errorMessage }));
      return;
    }

    login(form.email, form.password);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => handleFormChange('email', e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => handleFormChange('password', e.target.value)}
          className={styles.input}
        />
      </div>
      {form.error && <p className={styles.error}>{form.error}</p>}

      <button type="submit" className={styles.logButton}>
        Log in
      </button>
    </form>
  );
};
