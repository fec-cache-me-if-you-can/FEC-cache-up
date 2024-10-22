import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OutfitCard from '../OutfitCard';
import AbstractProductCard from '../AbstractProductCard';
import DeleteButton from '../DeleteButton';

jest.mock('../AbstractProductCard', () =>
  jest.fn(({ renderIcon }) => (
    <div data-testid="abstract-product-card">
      {renderIcon && renderIcon('mocked-id')}
    </div>
  )),
);
jest.mock('../DeleteButton', () =>
  jest.fn(() => <button data-testid="delete-button">Delete</button>),
);

describe('OutfitCard', () => {
  const mockProductId = '12345';
  const mockAction = jest.fn();
  const mockSetProductId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AbstractProductCard with correct props', () => {
    render(
      <OutfitCard
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
      <OutfitCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    expect(DeleteButton).toHaveBeenCalledWith(
      {
        productId: 'mocked-id',
        onDelete: mockAction,
      },
      {},
    );
  });

  it('renders DeleteButton within AbstractProductCard', () => {
    render(
      <OutfitCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    expect(screen.getByTestId('abstract-product-card')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('calls action with productId when DeleteButton is clicked', () => {
    render(
      <OutfitCard
        productId={mockProductId}
        action={mockAction}
        setProductId={mockSetProductId}
      />,
    );

    DeleteButton.mock.calls[0][0].onDelete(mockProductId);

    expect(mockAction).toHaveBeenCalledWith(mockProductId);
  });
});
