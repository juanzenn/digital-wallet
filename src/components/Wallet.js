// @ts-check
import styles from './Wallet.module.scss';

export default function Wallet({ balance }) {
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>Saldo disponible</h2>
      <span className={styles.balance}>${balance}</span>
    </article>
  );
}
