import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  test('renders with custom size', () => {
    render(<LoadingSpinner size={48} />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  test('renders with custom color', () => {
    render(<LoadingSpinner color="#FF0000" />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toHaveAttribute('fill', '#FF0000');
  });

  test('has correct viewBox', () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('has correct style', () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toHaveStyle({
      display: 'block',
      margin: 'auto',
    });
  });

  test('contains spinner group', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('spinner-group')).toBeInTheDocument();
  });

  test('contains correct number of rectangles', () => {
    render(<LoadingSpinner />);
    const rectangles = screen.getAllByTestId('spinner-rectangle');
    expect(rectangles).toHaveLength(7);
  });

  test('includes animation styles', () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId('loading-spinner');
    expect(svg).toContainHTML('spinner-animation');
  });
});
