import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OutfitList from '../OutfitList.jsx';
import { useOutfitData } from '../hooks/UseOutfitData.jsx';
import AbstractList from '../AbstractList.jsx';

jest.mock('../hooks/UseOutfitData.jsx', () => ({
  useOutfitData: jest.fn(),
}));

jest.mock('../AbstractList.jsx', () => {
  return jest.fn(() => <div data-testid="abstract-list" />);
});

jest.mock('../components/ProductImage.jsx', () => {
  return function DummyProductImage() {
    return <div>Mocked Product Image</div>;
  };
});

jest.mock('../components/AbstractProductCard.jsx', () => {
  return function DummyAbstractProductCard() {
    return <div>Mocked Abstract Product Card</div>;
  };
});

jest.mock('../components/OutfitCard.jsx', () => {
  return function DummyOutfitCard() {
    return <div>Mocked Outfit Card</div>;
  };
});

describe('OutfitList Component', () => {
  const mockSelectedProduct = { id: '123', name: 'Test Product' };
  const mockSetProductId = jest.fn();
  const mockOutfitIds = ['1', '2', '3'];
  const mockAddProduct = jest.fn();
  const mockRemoveProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useOutfitData.mockReturnValue({
      outfitIds: mockOutfitIds,
      isLoading: false,
      error: null,
      addProduct: mockAddProduct,
      removeProduct: mockRemoveProduct,
    });
  });

  test('renders AbstractList with correct props', () => {
    render(
      <OutfitList
        selectedProduct={mockSelectedProduct}
        setProductId={mockSetProductId}
      />,
    );

    expect(AbstractList).toHaveBeenCalledWith(
      expect.objectContaining({
        items: mockOutfitIds,
        isLoading: false,
        error: null,
        heading: 'Your Outfit',
        action: mockRemoveProduct,
        isOutfit: true,
        selectedProduct: mockSelectedProduct,
        setProductId: mockSetProductId,
      }),
      {},
    );
  });

  test('passes handleAddToOutfit function to AbstractList', () => {
    render(
      <OutfitList
        selectedProduct={mockSelectedProduct}
        setProductId={mockSetProductId}
      />,
    );

    const abstractListProps = AbstractList.mock.calls[0][0];
    abstractListProps.handleAddToOutfit(mockSelectedProduct.id);

    expect(mockAddProduct).toHaveBeenCalledWith(mockSelectedProduct.id);
  });

  test('handles loading state', () => {
    useOutfitData.mockReturnValue({
      outfitIds: [],
      isLoading: true,
      error: null,
      addProduct: mockAddProduct,
      removeProduct: mockRemoveProduct,
    });

    render(
      <OutfitList
        selectedProduct={mockSelectedProduct}
        setProductId={mockSetProductId}
      />,
    );

    expect(AbstractList).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: true,
      }),
      {},
    );
  });

  test('handles error state', () => {
    const mockError = 'An error occurred';
    useOutfitData.mockReturnValue({
      outfitIds: [],
      isLoading: false,
      error: mockError,
      addProduct: mockAddProduct,
      removeProduct: mockRemoveProduct,
    });

    render(
      <OutfitList
        selectedProduct={mockSelectedProduct}
        setProductId={mockSetProductId}
      />,
    );

    expect(AbstractList).toHaveBeenCalledWith(
      expect.objectContaining({
        error: mockError,
      }),
      {},
    );
  });
});
