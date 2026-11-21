import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart.utils';

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

  test('decrements quantity when more than 1', () => {
    expect(removeItemFromCart([{ ...hat, quantity: 3 }], hat)).toEqual([{ ...hat, quantity: 2 }]);
  });

  test('clears an item regardless of quantity', () => {
    const scarf = { id: 2, name: 'Scarf', price: 15, quantity: 1 };
    expect(clearItemFromCart([{ ...hat, quantity: 5 }, scarf], hat)).toEqual([scarf]);
  });
});
