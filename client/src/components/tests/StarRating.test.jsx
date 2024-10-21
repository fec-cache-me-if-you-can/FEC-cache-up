import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from '../StarRating';
import PropTypes from 'prop-types';

jest.mock('@fortawesome/react-fontawesome', () => ({
  // eslint-disable-next-line react/prop-types
  FontAwesomeIcon: ({ className, style, role }) => {
    return <i className={className} style={style} role={role} />;
  },
}));

describe('StarRating Component', () => {
  test('renders without crashing', () => {
    render(<StarRating rating={3} />);
  });

  test('renders correct number of stars', () => {
    render(<StarRating rating={3} />);
    const starElements = screen.getAllByRole('img', { hidden: true });
    expect(starElements.length).toBe(10);
  });

  test('renders stars filled according to rating', () => {
    render(<StarRating rating={3.5} />);
    const starFrontElements = screen
      .getAllByRole('img', { hidden: true })
      .filter((el) => el.classList.contains('star-front'));
    expect(starFrontElements[0].style.clipPath).toBe('inset(0 0% 0 0)');
    expect(starFrontElements[1].style.clipPath).toBe('inset(0 0% 0 0)');
    expect(starFrontElements[2].style.clipPath).toBe('inset(0 0% 0 0)');
    expect(starFrontElements[3].style.clipPath).toBe('inset(0 50% 0 0)');
    expect(starFrontElements[4].style.clipPath).toBe('inset(0 100% 0 0)');
  });

  test('clamps rating between 0 and 5', () => {
    const { rerender } = render(<StarRating rating={-1} />);
    let starFrontElements = screen
      .getAllByRole('img')
      .filter((el) => el.classList.contains('star-front'));
    starFrontElements.forEach((star) => {
      expect(star.style.clipPath).toBe('inset(0 100% 0 0)');
    });

    rerender(<StarRating rating={6} />);
    starFrontElements = screen
      .getAllByRole('img')
      .filter((el) => el.classList.contains('star-front'));
    starFrontElements.forEach((star) => {
      expect(star.style.clipPath).toBe('inset(0 0% 0 0)');
    });
  });
});
