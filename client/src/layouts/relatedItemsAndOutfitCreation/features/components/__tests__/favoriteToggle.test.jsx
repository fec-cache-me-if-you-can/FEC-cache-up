import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteToggle from '../FavoriteToggle';

jest.mock('@/components/icons.jsx', () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="mocked-icon">{icon}</span>,
}));

describe('FavoriteToggle Component', () => {
  const mockProductId = '12345';
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockAction.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders correctly', () => {
    render(<FavoriteToggle productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('transparent-button');

    const icon = screen.getByTestId('mocked-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('fa-star fa-regular fa-xl');
  });

  test('calls action with productId when clicked', () => {
    render(<FavoriteToggle productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAction).toHaveBeenCalledWith(mockProductId);
  });

  test('adds and removes is-favorite class when clicked', () => {
    render(<FavoriteToggle productId={mockProductId} action={mockAction} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveClass('is-favorite');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(button).not.toHaveClass('is-favorite');
  });
});
