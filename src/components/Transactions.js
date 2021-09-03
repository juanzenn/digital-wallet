// @ts-check
import { capitalize } from '../lib/helpers';
export default function Transactions({ transactions }) {
  return (
    <table>
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
          <tr>
            <td>{id}</td>
            <td>{capitalize(type)}</td>
            <td>{type === 'withdraw' ? `-${quantity}` : quantity}</td>
            <td>{date}</td>
          </tr>
        );
      })}
    </table>
  );
}
