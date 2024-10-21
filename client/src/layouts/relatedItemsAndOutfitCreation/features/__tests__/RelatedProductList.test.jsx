import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProductList from '../RelatedProductList';
import { useRelatedProducts } from '../hooks/useRelatedProducts';

jest.mock('../hooks/useRelatedProducts', () => ({
  useRelatedProducts: jest.fn(),
}));

jest.mock('../AbstractList', () => {
  /* eslint-disable */
  return function MockAbstractList({ heading, items, CardComponent }) {
    return (
      <div data-testid="abstract-list">
        <h5>{heading}</h5>
        {items.map((item, index) => (
          <CardComponent key={index} productId={item} />
        ))}
        /* eslint-enable */
      </div>
    );
  };
});

jest.mock('../components/RelatedProductCard', () => {
  return function MockRelatedProductCard({ productId }) { // eslint-disable-line
    return <div data-testid="related-product-card">{productId}</div>;
  };
});

describe('RelatedProductList Component', () => {
  const mockProducts = ['1', '2', '3'];
  const mockSetProductId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRelatedProducts.mockReturnValue({
      relatedProducts: mockProducts,
      isLoading: false,
      error: null,
    });
  });

  it('renders AbstractList with correct props', () => {
    render(<RelatedProductList setProductId={mockSetProductId} />);

    expect(screen.getByTestId('abstract-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('related-product-card')).toHaveLength(3);
  });

  it('passes correct heading to AbstractList', () => {
    render(<RelatedProductList setProductId={mockSetProductId} />);

    expect(screen.getByText('Related Products')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    useRelatedProducts.mockReturnValue({
      relatedProducts: [],
      isLoading: true,
      error: null,
    });

    render(<RelatedProductList setProductId={mockSetProductId} />);

    expect(screen.getByTestId('abstract-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('related-product-card')).toHaveLength(0);
  });

  it('handles error state', () => {
    useRelatedProducts.mockReturnValue({
      relatedProducts: [],
      isLoading: false,
      error: 'An error occurred',
    });

    render(<RelatedProductList setProductId={mockSetProductId} />);

    expect(screen.getByTestId('abstract-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('related-product-card')).toHaveLength(0);
  });
});
