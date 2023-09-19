import Head from 'next/head';
import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.ul}>
          <Link className={styles.navbarlink} href={"/post-class"}>Cours</Link>
          <Link className={styles.navbarlink} href={"/post-reward"}>Cartes cadeaux</Link>
          <Link className={styles.navbarlink} href={"/"}>Admin</Link>
        </ul>
      </nav>
    </div>
  );
}