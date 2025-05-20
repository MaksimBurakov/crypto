import styles from './ErrorBanner.module.scss';

interface ErrorBannerProps {
  message?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message = 'Error',
}) => {
  return <div className={styles.errorBanner}>{message}</div>;
};
