// @ts-check
import React from 'react';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import { getTotalBalance, generateTransaction } from './lib/helpers';

function App() {
  const [modalActive, setModalActive] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [transactionError, setTransactionError] = React.useState('');

  function addFunds(quantity) {
    const transaction = generateTransaction('add', quantity);
    setTransactions(prev => [...prev, transaction]);
  }

  function withdrawFunds(quantity) {
    setTransactionError('');

    if (balance <= 0) {
      setTransactionError(
        'Usted necesita tener un balance en su cuenta para retirar fondos.'
      );
      return;
    }

    if (balance < quantity) {
      setTransactionError(
        `Los fondos que intenta retirar son mayores a su balance actual. Su balance es $${balance}`
      );
      return;
    }

    const transaction = generateTransaction('withdraw', quantity);
    setTransactions(prev => [...prev, transaction]);
  }

  React.useEffect(() => {
    setBalance(getTotalBalance(transactions));
  }, [transactions]);

  return (
    <main>
      <h1>Bienvenido a digital-wallet</h1>
      <p>La mejor manera de guardar tu dinero online</p>

      <section>
        <Wallet balance={balance} />

        <button
          onClick={() => {
            setModalActive(true);
          }}>
          Registrar
        </button>
      </section>

      <Transactions transactions={transactions} />

      {modalActive ? (
        <Operations
          closeModal={() => setModalActive(false)}
          addFunds={addFunds}
          withdrawFunds={withdrawFunds}
          error={transactionError}
        />
      ) : null}
    </main>
  );
}

export default App;
