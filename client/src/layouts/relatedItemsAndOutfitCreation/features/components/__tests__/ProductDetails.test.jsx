import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetails from '../ProductDetails';
import PropTypes from 'prop-types';

jest.mock('../../../../../components/StarRating.jsx', () => {
  // eslint-disable-next-line
  const DummyStarRating = ({ rating }) => {
    return <div data-testid="star-rating">Rating: {rating}</div>;
  };
  return DummyStarRating;
});

describe('ProductDetails Component', () => {
  const mockDetails = {
    id: '123',
    name: 'Test Product',
    category: 'electronics',
    price: '99.99',
    sale: '89.99',
    rating: 4.5,
  };

  const mockRenderIcon = jest.fn(() => (
    <span data-testid="favorite-icon">❤️</span>
  ));
  const mockSetProductId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details correctly', () => {
    render(
      <ProductDetails
        details={mockDetails}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    expect(screen.getByText('ELECTRONICS')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 4.5');
    expect(screen.getByText('$89.99')).toBeInTheDocument();
  });

  test('calls renderIcon with correct id', () => {
    render(
      <ProductDetails
        details={mockDetails}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    expect(mockRenderIcon).toHaveBeenCalledWith('123');
    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });

  test('calls setProductId when title is clicked', () => {
    render(
      <ProductDetails
        details={mockDetails}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    fireEvent.click(screen.getByText('Test Product'));
    expect(mockSetProductId).toHaveBeenCalledWith('123');
  });

  test('renders title button with correct styles', () => {
    render(
      <ProductDetails
        details={mockDetails}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    const titleButton = screen.getByText('Test Product');
    expect(titleButton).toHaveClass(
      'card-title my-1 text-size-300 fw-semibold two-line-title hover-scale w-75',
    );
  });

  test('handles missing details gracefully', () => {
    const incompleteDetails = { id: '456' };
    render(
      <ProductDetails
        details={incompleteDetails}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    expect(screen.queryByText('UNDEFINED')).not.toBeInTheDocument();
    expect(screen.queryByText('$undefined')).not.toBeInTheDocument();
  });
});
