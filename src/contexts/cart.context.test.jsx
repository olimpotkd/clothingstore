import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { CartProvider, useCart } from './cart.context';

const hat = { id: 1, name: 'Hat', price: 10 };

const CartProbe = () => {
  const { cartCount, cartTotal, isCartOpen, addItem, removeItem, toggleCart } = useCart();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="total">{cartTotal}</span>
      <span data-testid="open">{String(isCartOpen)}</span>
      <button onClick={() => addItem(hat)}>add</button>
      <button onClick={() => removeItem(hat)}>remove</button>
      <button onClick={toggleCart}>toggle</button>
    </div>
  );
};

const renderCart = () => render(<CartProvider><CartProbe /></CartProvider>);

beforeEach(() => localStorage.clear());

test('derives count and total from cart items', () => {
  renderCart();
  fireEvent.click(screen.getByText('add'));
  fireEvent.click(screen.getByText('add'));
  fireEvent.click(screen.getByText('remove'));

  expect(screen.getByTestId('count')).toHaveTextContent('1');
  expect(screen.getByTestId('total')).toHaveTextContent('10');
});

test('toggles the cart dropdown', () => {
  renderCart();
  expect(screen.getByTestId('open')).toHaveTextContent('false');
  fireEvent.click(screen.getByText('toggle'));
  expect(screen.getByTestId('open')).toHaveTextContent('true');
});

test('persists cart items to localStorage and restores them', () => {
  const { unmount } = renderCart();
  fireEvent.click(screen.getByText('add'));
  expect(JSON.parse(localStorage.getItem('cart'))).toEqual([{ ...hat, quantity: 1 }]);

  unmount();
  renderCart();
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});

test('useCart throws outside of CartProvider', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<CartProbe />)).toThrow('useCart must be used inside <CartProvider>');
  spy.mockRestore();
});
