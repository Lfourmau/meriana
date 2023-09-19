import styles from '../styles/Alert.module.css';

export default function Alert(props) {
  return (
    <p className={props.status=='success' ? styles.success : styles.fail}>{props.text}</p>
  );
}