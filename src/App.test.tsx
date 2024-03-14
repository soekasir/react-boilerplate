import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from './pages/Router';

test('renders learn react', () => {
  render(<Router />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
