// @ts-check
import React from 'react';
import styles from './Operations.module.scss';

export default function Operations({
  closeModal,
  addFunds,
  withdrawFunds,
  balance,
}) {
  const quantityRef = React.useRef(null);
  const [view, setView] = React.useState('add');
  const [error, setError] = React.useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (quantityRef.current.value) {
      if (view === 'add') {
        addFunds(quantityRef.current.value);
      } else if (view === 'withdraw') {
        if (balance <= 0) {
          setError(
            'Usted necesita tener un balance en su cuenta para retirar fondos.'
          );
          return;
        }

        if (balance < quantityRef.current.value) {
          setError(
            `Los fondos que intenta retirar son mayores a su balance actual. Su balance es $${balance}`
          );
          return;
        }

        withdrawFunds(quantityRef.current.value);
      }
    }
  };

  React.useEffect(() => {
    setError('');
    quantityRef.current.value = null;
  }, [view]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <button
          type='button'
          className={styles.closeButton}
          onClick={closeModal}>
          X
        </button>
        <nav className={styles.navigation}>
          <div
            className={
              view === 'add'
                ? styles.navigationItemActive
                : styles.navigationItem
            }
            onClick={() => setView('add')}>
            Agregar fondos
          </div>
          <div
            className={
              view === 'withdraw'
                ? styles.navigationItemActive
                : styles.navigationItem
            }
            onClick={() => setView('withdraw')}>
            Retirar fondos
          </div>
        </nav>
        <section>
          <header>
            <h3 className={styles.title}>
              {view === 'add'
                ? 'Añadir fondos'
                : view === 'withdraw'
                ? 'Retirar fondos'
                : null}
            </h3>
            <p className={styles.subtitle}>
              {view === 'add'
                ? 'Añada fondos a su cuenta de una manera sencilla'
                : view === 'withdraw'
                ? 'Retire su dinero directamente en efectivo'
                : null}
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='quantity' />
              <input
                placeholder='150'
                className={styles.input}
                ref={quantityRef}
                type='number'
                id='quantity'
                min={0}
                required
              />
            </div>
            <div className={styles.submitContainer}>
              <span className={styles.error}>
                {error.length <= 0 ? null : error}
              </span>
              <button className='button' type='submit'>
                {view === 'add'
                  ? 'Añadir fondos'
                  : view === 'withdraw'
                  ? 'Retirar fondos'
                  : null}
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
}
