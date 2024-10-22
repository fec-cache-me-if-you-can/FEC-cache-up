import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from '../PrimaryButton';

// Mock the Icon component
jest.mock('../icons.jsx', () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="mocked-icon">{icon}</span>,
}));

describe('PrimaryButton Component', () => {
  test('renders with default props', () => {
    render(<PrimaryButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('unnamed button');
    expect(button).toHaveClass('btn', 'btn-primary', 'square', 'btn-lg', 'm-3');
  });

  test('renders with custom label', () => {
    render(<PrimaryButton label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<PrimaryButton onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when isDisabled is true', () => {
    render(<PrimaryButton isDisabled={true} />);
    expect(screen.getByRole('button')).toHaveClass('disabled');
  });

  test('applies extra styles', () => {
    render(<PrimaryButton extraStyles="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('renders plus icon when plus prop is true', () => {
    render(<PrimaryButton plus={true} />);
    expect(screen.getByTestId('mocked-icon')).toHaveTextContent('fa-plus');
  });

  test('does not render plus icon when plus prop is false', () => {
    render(<PrimaryButton plus={false} />);
    expect(screen.queryByTestId('mocked-icon')).not.toBeInTheDocument();
  });

  test('combines all classes correctly', () => {
    render(<PrimaryButton isDisabled={true} extraStyles="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'btn',
      'btn-primary',
      'square',
      'btn-lg',
      'm-3',
      'disabled',
      'custom-class',
    );
  });
});
