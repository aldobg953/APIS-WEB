import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the</h1>
      <h1 className={styles.title} id={styles.subTitle}>Super Happy API Explorer</h1>

      <div className={styles.cardGrid}>
        <Link href="/marvel" className={styles.card}>
          <h2>Marvel API &rarr;</h2>
        </Link>

        <Link href="/weather" className={styles.card}>
          <h2>OpenWeather API &rarr;</h2>
        </Link>

        <Link href="/pokedex" className={styles.card}>
          <h2>Pokedex API &rarr;</h2>
        </Link>
      </div>

      <footer className={styles.footer}>
        <p>by Aldo Barrera</p>
      </footer>
      
    </div>
  );
}