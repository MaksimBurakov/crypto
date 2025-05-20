import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      login(email, password);
      navigate('/');
    } else {
      setError('Both email and password fields are required');
    }
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
          value={email}
          onChange={handleEmail}
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
          value={password}
          onChange={handlePassword}
          className={styles.input}
        />
      </div>
      <p className={styles.error}>{error}</p>

      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.logButton}>
          Log in
        </button>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Home page
        </button>
      </div>
    </form>
  );
};
