import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SuccessPage from '../pages/SuccessPage';

describe('format utilities', () => {
  it('renders the success page heading', () => {
    render(
      <MemoryRouter>
        <SuccessPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Order Placed')).toBeInTheDocument();
  });
});
