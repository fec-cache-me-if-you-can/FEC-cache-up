import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import XIcon from '../XIcon.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

describe('XIcon Component', () => {
  beforeEach(() => {
    FontAwesomeIcon.mockClear();
  });

  test('renders without crashing', () => {
    render(<XIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalled();
  });

  test('uses faXTwitter icon', () => {
    render(<XIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: faXTwitter }),
      {},
    );
  });

  test.each(['2xs', 'xs', 'sm', '', 'lg', 'xl', '2xl'])(
    'renders with valid size %s',
    (size) => {
      render(<XIcon size={size} />);
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
    expect(() => render(<XIcon size="invalid" />)).toThrow(
      'Invalid size prop for XIcon',
    );
    consoleSpy.mockRestore();
  });

  test('uses default size when not provided', () => {
    render(<XIcon />);
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ size: '' }),
      {},
    );
  });
});
