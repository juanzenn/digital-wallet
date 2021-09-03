// @ts-check
import React from 'react';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import { getTotalBalance, generateTransaction } from './lib/helpers';

import './App.scss';

function App() {
  const [modalActive, setModalActive] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);

  function addFunds(quantity) {
    const transaction = generateTransaction('add', quantity);
    setTransactions(prev => [...prev, transaction]);
    setModalActive(false);
  }

  function withdrawFunds(quantity) {
    const transaction = generateTransaction('withdraw', quantity);
    setTransactions(prev => [...prev, transaction]);
    setModalActive(false);
  }

  React.useEffect(() => {
    setBalance(getTotalBalance(transactions));
  }, [transactions]);

  return (
    <main className='main-container'>
      <h1>Bienvenido a digital-wallet</h1>
      <p>La mejor manera de guardar tu dinero online</p>

      <section className='funds-container'>
        <Wallet balance={balance} />

        <button
          className='button button--register'
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
          balance={balance}
        />
      ) : null}
    </main>
  );
}

export default App;
