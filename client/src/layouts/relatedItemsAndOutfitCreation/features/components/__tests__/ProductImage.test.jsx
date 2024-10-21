import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductImage from '../ProductImage';

jest.mock('@/assets/public/placeholder.jpeg', () => 'mocked-placeholder.jpg');

describe('ProductImage Component', () => {
  test('renders image with provided src and alt', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Image';
    render(<ProductImage src={src} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveClass('card-img-top', 'object-fit-cover', 'square');
  });

  test('renders placeholder image when src is not provided', () => {
    const alt = 'Placeholder Image';
    render(<ProductImage alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'mocked-placeholder.jpg');
  });

  test('renders placeholder image when src is an empty string', () => {
    const src = '';
    const alt = 'Empty Source Image';
    render(<ProductImage src={src} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'mocked-placeholder.jpg');
  });

  test('applies correct CSS classes', () => {
    render(<ProductImage src="test.jpg" alt="Test" />);

    const img = screen.getByAltText('Test');
    expect(img).toHaveClass('card-img-top', 'object-fit-cover', 'square');
  });

  test('handles missing alt prop gracefully', () => {
    render(<ProductImage src="test.jpg" />);

    const img = screen.getByRole('presentation');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveClass('card-img-top', 'object-fit-cover', 'square');
  });

  test('uses placeholder when src is not provided', () => {
    render(<ProductImage alt="Default Placeholder" />);

    const img = screen.getByAltText('Default Placeholder');
    expect(img).toHaveAttribute('src', 'mocked-placeholder.jpg');
  });
});
