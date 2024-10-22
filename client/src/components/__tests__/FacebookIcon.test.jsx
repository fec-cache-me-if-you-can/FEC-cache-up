import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PropTypes } from 'prop-types';
import FacebookIcon from '../FacebookIcon.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

// Mock the FontAwesomeIcon component
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

describe('FacebookIcon Component', () => {
  beforeEach(() => {
    FontAwesomeIcon.mockClear();
  });

  test('renders without crashing', () => {
    render(<FacebookIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalled();
  });

  test('uses faFacebook icon', () => {
    render(<FacebookIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: faFacebook }),
      {},
    );
  });

  test('passes size prop to FontAwesomeIcon', () => {
    render(<FacebookIcon size="2x" />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ size: '2x' }),
      {},
    );
  });

  test('uses default size when not provided', () => {
    render(<FacebookIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ size: '' }),
      {},
    );
  });

  test('accepts different size values', () => {
    const sizes = ['xs', 'sm', 'lg', '2x', '3x', '4x', '5x'];
    sizes.forEach((size) => {
      FontAwesomeIcon.mockClear();
      render(<FacebookIcon size={size} />);
      expect(FontAwesomeIcon).toHaveBeenCalledWith(
        expect.objectContaining({ size: size }),
        {},
      );
    });
  });
});
