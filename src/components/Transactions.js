// @ts-check
import styles from './Transactions.module.scss';
export default function Transactions({ transactions }) {
  if (transactions.length <= 0) {
    return (
      <div className={styles.wrapper}>
        <h2>No hay transacciones todavía...</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <tr>
          <th>Referencia</th>
          <th>Tipo de transacción</th>
          <th>Cantidad</th>
          <th>Fecha</th>
        </tr>
        {transactions.map(transaction => {
          const { id } = transaction;
          const { type, date, quantity } = transaction.transactionInfo;
          return (
            <tr className={styles.tableRow}>
              <td>{id}</td>
              <td>{type === 'add' ? 'Añadir fondos' : 'Retirar fondos'}</td>
              <td className={styles.numberCell}>
                {type === 'withdraw' ? `-$${quantity}` : `$${quantity}`}
              </td>
              <td className={styles.numberCell}>{date}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
