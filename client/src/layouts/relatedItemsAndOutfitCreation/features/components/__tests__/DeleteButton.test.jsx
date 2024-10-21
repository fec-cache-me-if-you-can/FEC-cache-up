import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteButton from '../DeleteButton';

jest.mock('@/components/icons.jsx', () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="mock-icon">{icon}</span>,
}));

describe('DeleteButton Component', () => {
  const mockProductId = 12345;
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(<DeleteButton productId={mockProductId} onDelete={mockOnDelete} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('transparent-button', 'trash-button');

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveTextContent('fa-trash fa-solid');
  });

  it('adds and removes "clicked" class when clicked', () => {
    render(<DeleteButton productId={mockProductId} onDelete={mockOnDelete} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveClass('clicked');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(button).not.toHaveClass('clicked');
  });

  it('calls onDelete with productId after delay', () => {
    render(<DeleteButton productId={mockProductId} onDelete={mockOnDelete} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnDelete).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockOnDelete).toHaveBeenCalledWith(mockProductId);
  });
});
