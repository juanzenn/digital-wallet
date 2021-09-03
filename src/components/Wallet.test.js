import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Wallet from './Wallet';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with different values of balance', () => {
  act(() => {
    render(<Wallet balance={0} />, container);
  });
  expect(container.textContent).toBe(`Saldo disponible$0`);

  act(() => {
    render(<Wallet balance={214} />, container);
  });
  expect(container.textContent).toBe(`Saldo disponible$214`);

  act(() => {
    render(<Wallet balance={500} />, container);
  });
  expect(container.textContent).toBe(`Saldo disponible$500`);

  act(() => {
    render(<Wallet balance={360} />, container);
  });
  expect(container.textContent).toBe(`Saldo disponible$360`);
});
