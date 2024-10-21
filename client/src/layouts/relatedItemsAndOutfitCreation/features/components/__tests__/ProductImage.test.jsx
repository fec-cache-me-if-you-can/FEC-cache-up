import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductImage from '../ProductImage';

describe('ProductImage Component', () => {
  const mockPlaceholder = 'mock-placeholder.jpg';

  test('renders image with provided src and alt', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Image';
    render(<ProductImage src={src} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveClass('card-img-top object-fit-cover square');
  });

  test('renders placeholder image when src is not provided', () => {
    const alt = 'Placeholder Image';
    render(<ProductImage alt={alt} placeholder={mockPlaceholder} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPlaceholder);
  });

  test('renders placeholder image when src is an empty string', () => {
    const src = '';
    const alt = 'Empty Source Image';
    render(<ProductImage src={src} alt={alt} placeholder={mockPlaceholder} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPlaceholder);
  });

  test('applies correct CSS classes', () => {
    render(<ProductImage src="test.jpg" alt="Test" />);

    const img = screen.getByAltText('Test');
    expect(img).toHaveClass('card-img-top');
    expect(img).toHaveClass('object-fit-cover');
    expect(img).toHaveClass('square');
  });

  test('handles missing alt prop gracefully', () => {
    render(<ProductImage src="test.jpg" />);

    const img = screen.getByRole('presentation');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  test('uses default placeholder when src is not provided and no custom placeholder is set', () => {
    render(<ProductImage alt="Default Placeholder" />);

    const img = screen.getByAltText('Default Placeholder');
    expect(img).toHaveAttribute('src', '/assets/public/placeholder.jpeg');
  });
});
