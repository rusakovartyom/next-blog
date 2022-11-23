import clsx from 'clsx';
import styles from './styles.module.css';

const Button = (props) => {
  const button = clsx(
    styles.button,
    props.blue && styles.blue,
    props.red && styles.red,
    props.green && styles.green,
    props.google && styles.google
  );
  return (
    <button onClick={props.onClick} className={button}>
      {props.children}
    </button>
  );
};
export default Button;
