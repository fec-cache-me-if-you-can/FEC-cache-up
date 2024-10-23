import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToOutfitCard from '../AddToOutfitCard';

jest.mock('@/components/icons.jsx', () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="mock-icon">{icon}</span>,
}));

describe('AddToOutfitCard Component', () => {
  const mockProductId = '12345';
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders add button when product is not in outfit', () => {
    render(<AddToOutfitCard productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('aria-label', 'Add product to outfit');
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('fa-plus');
  });

  test('renders disabled button when product is in outfit', () => {
    render(
      <AddToOutfitCard
        productId={mockProductId}
        action={mockAction}
        items={[mockProductId]}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Product already in outfit');
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('fa-check');
  });

  test('calls action with productId when clicked', () => {
    render(<AddToOutfitCard productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAction).toHaveBeenCalledWith(mockProductId);
  });

  test('logs error when action is not a function', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <AddToOutfitCard productId={mockProductId} action="not a function" />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(consoleErrorSpy).toHaveBeenCalledWith('action is not a function');
    consoleErrorSpy.mockRestore();
  });

  test('applies correct classes when product is not in outfit', () => {
    render(<AddToOutfitCard productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'btn',
      'btn-primary',
      'square',
      'm-3',
      'px-3',
      'py-2',
    );
    expect(button).not.toHaveClass('disabled');
  });

  test('applies correct classes when product is in outfit', () => {
    render(
      <AddToOutfitCard
        productId={mockProductId}
        action={mockAction}
        items={[mockProductId]}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'btn',
      'btn-primary',
      'square',
      'm-3',
      'px-3',
      'py-2',
    );
  });
});
