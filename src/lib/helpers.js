// @ts-check
class Transaction {
  constructor(id, type, date, quantity) {
    this.id = String(id);
    this.transactionInfo = {
      type: String(type),
      date: String(date),
      quantity: Number(quantity),
    };
  }
}

export function createId() {
  const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let id = '';
  for (let i = 0; i < 7; i++) {
    id += letters[Math.floor(Math.random() * (36 - 0) + 0)];
  }

  return id;
}

export function createDate() {
  const rawDate = new Date();

  const date = `${rawDate.getDay()}-${rawDate.getMonth()}-${rawDate.getFullYear()}`;
  const time = `${rawDate.getHours()}:${rawDate.getMinutes()}`;

  return `${date} @ ${time}`;
}

export function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function getTotalBalance(transactions) {
  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.transactionInfo.type === 'withdraw') {
      return (acc -= transaction.transactionInfo.quantity);
    } else {
      return (acc += transaction.transactionInfo.quantity);
    }
  }, 0);

  return balance;
}

export function generateTransaction(type, quantity) {
  const transaction = new Transaction(createId(), type, createDate(), quantity);

  return transaction;
}
