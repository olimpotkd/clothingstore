import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomButton from './custom-button.component';

test('renders its children', () => {
  render(<CustomButton>Sign in</CustomButton>);
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});
