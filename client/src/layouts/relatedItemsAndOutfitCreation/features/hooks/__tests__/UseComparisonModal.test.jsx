import { renderHook, act, waitFor } from '@testing-library/react';
import { useComparisonModal } from '../UseComparisonModal.jsx';
import { fetchProductInformationById } from '../../../api.js';

jest.mock('../../../api.js', () => ({
  fetchProductInformationById: jest.fn(),
}));

describe('useComparisonModal', () => {
  const mockProductId = '123';
  const mockRelatedProductId = '456';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useComparisonModal(mockProductId));

    expect(result.current.showModal).toBe(false);
    expect(result.current.relatedProduct).toEqual({});
    expect(result.current.selectedProduct).toEqual({});
  });

  it('should handle card click and open modal', async () => {
    const mockRelatedProduct = {
      id: mockRelatedProductId,
      name: 'Related Product',
    };
    const mockSelectedProduct = { id: mockProductId, name: 'Selected Product' };

    fetchProductInformationById
      .mockResolvedValueOnce(mockRelatedProduct)
      .mockResolvedValueOnce(mockSelectedProduct);

    const { result } = renderHook(() => useComparisonModal(mockProductId));

    await act(async () => {
      result.current.handleCardClick(mockRelatedProductId);
    });

    await waitFor(() => expect(result.current.showModal).toBe(true));
    await waitFor(() =>
      expect(result.current.relatedProduct).toEqual(mockRelatedProduct),
    );
    await waitFor(() =>
      expect(result.current.selectedProduct).toEqual(mockSelectedProduct),
    );

    expect(fetchProductInformationById).toHaveBeenCalledTimes(2);
    expect(fetchProductInformationById).toHaveBeenCalledWith(
      mockRelatedProductId,
    );
    expect(fetchProductInformationById).toHaveBeenCalledWith(mockProductId);
  });

  it('should handle close modal', async () => {
    const { result } = renderHook(() => useComparisonModal(mockProductId));

    act(() => {
      result.current.handleCloseModal();
    });

    await waitFor(() => expect(result.current.showModal).toBe(false));
  });

  it('should handle API error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    fetchProductInformationById.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useComparisonModal(mockProductId));

    await act(async () => {
      await result.current
        .handleCardClick(mockRelatedProductId)
        .catch(() => {});
    });

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching product data:',
      expect.any(Error),
    );

    await waitFor(() => expect(result.current.showModal).toBe(false));
    await waitFor(() => expect(result.current.relatedProduct).toEqual({}));
    await waitFor(() => expect(result.current.selectedProduct).toEqual({}));

    consoleErrorSpy.mockRestore();
  });

  it('should memoize handleCardClick and handleCloseModal', () => {
    const { result, rerender } = renderHook(() =>
      useComparisonModal(mockProductId),
    );

    const initialHandleCardClick = result.current.handleCardClick;
    const initialHandleCloseModal = result.current.handleCloseModal;

    rerender();

    expect(result.current.handleCardClick).toBe(initialHandleCardClick);
    expect(result.current.handleCloseModal).toBe(initialHandleCloseModal);
  });
});
