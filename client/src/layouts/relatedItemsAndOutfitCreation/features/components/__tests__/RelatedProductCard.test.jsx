import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProductCard from '../RelatedProductCard';
import AbstractProductCard from '../AbstractProductCard';
import CompareButton from '../CompareButton.jsx';

jest.mock('../AbstractProductCard', () =>
  jest.fn(({ renderIcon }) => {
    return (
      <div data-testid="abstract-product-card">
        {renderIcon && renderIcon('mocked-id')}
      </div>
    );
  }),
);
jest.mock('../CompareButton', () =>
  jest.fn(() => <div data-testid="favorite-toggle" />),
);

describe('RelatedProductCard', () => {
  const mockProductId = '12345';
  const mockAction = jest.fn();
  const mockSetProductId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AbstractProductCard with correct props', () => {
    render(
      <RelatedProductCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    expect(AbstractProductCard).toHaveBeenCalledWith(
      {
        productId: mockProductId,
        renderIcon: expect.any(Function),
        setProductId: mockSetProductId,
      },
      {},
    );
  });

  it('passes correct renderIcon function to AbstractProductCard', () => {
    render(
      <RelatedProductCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    expect(CompareButton).toHaveBeenCalledWith(
      {
        productId: 'mocked-id',
        action: mockAction,
      },
      {},
    );
  });

  it('renders without crashing', () => {
    render(
      <RelatedProductCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    expect(screen.getByTestId('abstract-product-card')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument();
  });
});
