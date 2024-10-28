import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PinterestIcon from '../PinterestIcon.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

// Mock the FontAwesomeIcon component
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

describe('PinterestIcon Component', () => {
  beforeEach(() => {
    FontAwesomeIcon.mockClear();
  });

  test('renders without crashing', () => {
    render(<PinterestIcon size="" />);
    expect(FontAwesomeIcon).toHaveBeenCalled();
  });

  test('uses faPinterest icon', () => {
    render(<PinterestIcon size="" />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: faPinterest }),
      {},
    );
  });

  test.each(['2xs', 'xs', 'sm', '', 'lg', 'xl', '2xl'])(
    'renders with valid size %s',
    (size) => {
      render(<PinterestIcon size={size} />);
      expect(FontAwesomeIcon).toHaveBeenCalledWith(
        expect.objectContaining({ size: size }),
        {},
      );
    },
  );

  test('throws error for invalid size', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => render(<PinterestIcon size="invalid" />)).toThrow(
      'Invalid size prop for PinterestIcon',
    );
    consoleSpy.mockRestore();
  });

  test('uses default size when not provided', () => {
    render(<PinterestIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ size: '' }),
      {},
    );
  });
});
