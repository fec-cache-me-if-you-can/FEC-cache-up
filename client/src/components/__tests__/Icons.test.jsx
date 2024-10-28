import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '../icons.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { all } from '@awesome.me/kit-60350fbc81/icons';

// Mock the FontAwesomeIcon component
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

// Add all icons to the library before tests
library.add(...all);

describe('Icon Component', () => {
  test('renders FontAwesomeIcon when icon prop is provided', () => {
    render(<Icon icon="fa-solid fa-user" />);
    expect(
      screen.queryByText('missing prop value for icon'),
    ).not.toBeInTheDocument();
  });

  test('renders error message when icon prop is not provided', () => {
    render(<Icon />);
    expect(screen.getByText('missing prop value for icon')).toBeInTheDocument();
  });

  test('renders error message when icon prop is an empty string', () => {
    render(<Icon icon="" />);
    expect(screen.getByText('missing prop value for icon')).toBeInTheDocument();
  });

  test('passes correct icon prop to FontAwesomeIcon', () => {
    const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
    render(<Icon icon="fa-solid fa-user" />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      { icon: 'fa-sharp fa-solid fa-user' },
      {},
    );
  });

  test('error message has correct class', () => {
    render(<Icon />);
    const errorMessage = screen.getByText('missing prop value for icon');
    expect(errorMessage).toHaveClass('text-danger');
  });
});
