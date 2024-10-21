import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '../icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mock the FontAwesomeIcon component
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

describe('Icon Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders FontAwesomeIcon when icon prop is provided', () => {
    render(<Icon icon="fa-solid fa-user" />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'fa-sharp fa-solid fa-user' }),
      {},
    );
    expect(
      screen.queryByText('missing prop value for icon'),
    ).not.toBeInTheDocument();
  });

  test('renders error message when icon prop is not provided', () => {
    // Temporarily disable console.error to suppress prop type warning
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<Icon />);
    expect(screen.getByText('missing prop value for icon')).toBeInTheDocument();

    // Re-enable console.error
    consoleErrorSpy.mockRestore();
  });

  test('renders error message when icon prop is an empty string', () => {
    render(<Icon icon="" />);
    expect(screen.getByText('missing prop value for icon')).toBeInTheDocument();
  });

  test('passes correct icon prop to FontAwesomeIcon', () => {
    render(<Icon icon="fa-solid fa-user" />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'fa-sharp fa-solid fa-user' }),
      {},
    );
  });

  test('error message has correct class', () => {
    render(<Icon icon="" />);
    const errorMessage = screen.getByText('missing prop value for icon');
    expect(errorMessage).toHaveClass('text-danger');
  });
});
