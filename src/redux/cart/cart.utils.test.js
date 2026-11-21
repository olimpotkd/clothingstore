import { addItemToCart, removeItemFromCart } from './cart.utils';

describe('cart utils', () => {
  const hat = { id: 1, name: 'Hat', price: 10 };

  test('adds a new item with quantity 1', () => {
    expect(addItemToCart([], hat)).toEqual([{ ...hat, quantity: 1 }]);
  });

  test('increments quantity of an existing item', () => {
    expect(addItemToCart([{ ...hat, quantity: 1 }], hat)).toEqual([{ ...hat, quantity: 2 }]);
  });

  test('removes an item when quantity reaches 0', () => {
    expect(removeItemFromCart([{ ...hat, quantity: 1 }], hat)).toEqual([]);
  });
});
