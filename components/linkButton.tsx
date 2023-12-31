import Head from 'next/head';
import styles from '../styles/LinkButton.module.css';
import Link from 'next/link';

export default function LinkButton(props) {
  return (
	<a onClick={props.onClick} href={props.href} className={props.color=='third' ? styles.thirdbutton : styles.greenbutton}>{props.text}</a> 
  );
}