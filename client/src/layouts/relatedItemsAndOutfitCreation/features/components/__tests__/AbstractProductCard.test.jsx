import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AbstractProductCard from '../AbstractProductCard';
import { fetchCompleteProductDataById } from '../../../api.js';
import { processProductData } from '../../../utils.js';

jest.mock('../../../api.js', () => ({
  fetchCompleteProductDataById: jest.fn(),
}));

jest.mock('../../../utils.js', () => ({
  processProductData: jest.fn(),
}));

/* eslint-disable */
jest.mock('@/components/LoadingSpinner.jsx', () => () => (
  <div data-testid="loading-spinner" />
));
jest.mock('../ProductImage.jsx', () => ({ src, alt }) => (
  <img src={src} alt={alt} data-testid="product-image" />
));
jest.mock('../Placeholder.jsx', () => () => <div data-testid="placeholder" />);
jest.mock('../ProductDetails.jsx', () =>
  /* eslint-disable */
    ({ details, renderIcon, setProductId }) => (
      <div data-testid="product-details">
        <span>{details.name}</span>
        <button onClick={() => renderIcon(details.id)}>Icon</button>
        <button onClick={() => setProductId(details.id)}>Set Product</button>
      </div>
  ),
);
/* eslint-enable */

describe('AbstractProductCard', () => {
  const mockProductId = '12345';
  const mockRenderIcon = jest.fn();
  const mockSetProductId = jest.fn();
  const mockProductData = {
    productInfo: { id: mockProductId, name: 'Test Product' },
    styleInfo: {
      results: [{ original_price: '100', photos: [{ url: 'test.jpg' }] }],
    },
    reviewMeta: { ratings: { 4: '10', 5: '10' } },
  };
  const mockProcessedData = {
    id: mockProductId,
    name: 'Test Product',
    imageUrl: 'test.jpg',
    price: '100',
    rating: 4.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetchCompleteProductDataById.mockResolvedValue(mockProductData);
    processProductData.mockReturnValue(mockProcessedData);
  });

  it('renders loading state initially', async () => {
    render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });

  it('renders product details after loading', async () => {
    render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await screen.findByTestId('product-image');
    await screen.findByTestId('product-details');
    await screen.findByText('Test Product');
  });

  it('handles fetch error', async () => {
    fetchCompleteProductDataById.mockRejectedValue(new Error('Fetch error'));

    render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          'Failed to load product data. Please try again later.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('calls renderIcon when icon button is clicked', async () => {
    render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await screen.findByText('Icon');
    screen.getByText('Icon').click();

    expect(mockRenderIcon).toHaveBeenCalledWith(mockProductId);
  });

  it('calls setProductId when set product button is clicked', async () => {
    render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await screen.findByText('Set Product');
    screen.getByText('Set Product').click();

    expect(mockSetProductId).toHaveBeenCalledWith(mockProductId);
  });

  it('re-fetches data when productId changes', async () => {
    const { rerender } = render(
      <AbstractProductCard
        productId={mockProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await screen.findByTestId('product-details');

    const newProductId = '67890';
    rerender(
      <AbstractProductCard
        productId={newProductId}
        renderIcon={mockRenderIcon}
        setProductId={mockSetProductId}
      />,
    );

    await waitFor(() => {
      expect(fetchCompleteProductDataById).toHaveBeenCalledWith(newProductId);
    });
  });
});
