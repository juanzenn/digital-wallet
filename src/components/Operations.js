// @ts-check
import React from 'react';

export default function Operations({
  closeModal,
  addFunds,
  withdrawFunds,
  error,
}) {
  const quantityRef = React.useRef(null);
  const [view, setView] = React.useState('add');

  const handleSubmit = event => {
    event.preventDefault();
    if (quantityRef.current.value) {
      if (view === 'add') {
        addFunds(quantityRef.current.value);
      } else if (view === 'withdraw') {
        withdrawFunds(quantityRef.current.value);
      }
    } else {
      alert('Please add something');
    }
  };

  return (
    <section>
      <button type='button' onClick={closeModal}>
        CLOSE
      </button>
      <nav>
        <div onClick={() => setView('add')}>Agregar fondos</div>
        <div onClick={() => setView('withdraw')}>Retirar fondos</div>
      </nav>

      <section>
        <header>
          <h3>
            {view === 'add'
              ? 'Añadir fondos'
              : view === 'withdraw'
              ? 'Retirar fondos'
              : null}
          </h3>
          <p>
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
              ref={quantityRef}
              type='number'
              id='quantity'
              min={0}
              required
            />
          </div>
          <span>{error.lenght <= 0 ? null : error}</span>
          <button type='submit'>
            {view === 'add'
              ? 'Añadir fondos'
              : view === 'withdraw'
              ? 'Retirar fondos'
              : null}
          </button>
        </form>
      </section>
    </section>
  );
}
