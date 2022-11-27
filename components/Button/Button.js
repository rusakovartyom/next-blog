import clsx from 'clsx';
import styles from './styles.module.css';

const Button = ({ blue, red, green, google, type, onClick, children }) => {
  const button = clsx(
    styles.button,
    blue && styles.blue,
    red && styles.red,
    green && styles.green,
    google && styles.google
  );
  return (
    <button type={type} onClick={onClick} className={button}>
      {children}
    </button>
  );
};
export default Button;
