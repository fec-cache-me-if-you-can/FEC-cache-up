import { renderHook, waitFor } from '@testing-library/react';
import { useRelatedProducts } from '../UseRelatedProducts.jsx';
import { fetchRelatedProductIds } from '../../../api.js';

// Mock the API function
jest.mock('../../../api.js', () => ({
  fetchRelatedProductIds: jest.fn(),
}));

describe('useRelatedProducts', () => {
  const mockProductId = '12345';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', async () => {
    fetchRelatedProductIds.mockResolvedValueOnce([]);
    const { result } = renderHook(() => useRelatedProducts(mockProductId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.relatedProducts).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should fetch related product ids', async () => {
    const mockRelatedIds = ['1', '2', '3'];
    fetchRelatedProductIds.mockResolvedValueOnce(mockRelatedIds);

    const { result } = renderHook(() => useRelatedProducts(mockProductId));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.relatedProducts).toEqual(mockRelatedIds);
    expect(result.current.error).toBe(null);
    expect(fetchRelatedProductIds).toHaveBeenCalledWith(mockProductId);
  });

  it('should handle error when fetching related product ids fails', async () => {
    fetchRelatedProductIds.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useRelatedProducts(mockProductId));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe(
      'Failed to load related products. Please try again later.',
    );
    expect(result.current.relatedProducts).toEqual([]);
  });

  it('should refetch when productId changes', async () => {
    const mockRelatedIds1 = ['1', '2', '3'];
    const mockRelatedIds2 = ['4', '5', '6'];
    fetchRelatedProductIds
      .mockResolvedValueOnce(mockRelatedIds1)
      .mockResolvedValueOnce(mockRelatedIds2);

    const { result, rerender } = renderHook(
      ({ productId }) => useRelatedProducts(productId),
      { initialProps: { productId: '12345' } },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.relatedProducts).toEqual(mockRelatedIds1);

    rerender({ productId: '67890' });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.relatedProducts).toEqual(mockRelatedIds2);
    expect(fetchRelatedProductIds).toHaveBeenCalledTimes(2);
    expect(fetchRelatedProductIds).toHaveBeenCalledWith('67890');
  });

  it('should not refetch when productId remains the same', async () => {
    fetchRelatedProductIds.mockResolvedValueOnce(['1', '2', '3']);

    const { result, rerender } = renderHook(
      ({ productId }) => useRelatedProducts(productId),
      { initialProps: { productId: '12345' } },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    rerender({ productId: '12345' });

    expect(fetchRelatedProductIds).toHaveBeenCalledTimes(1);
  });
});
