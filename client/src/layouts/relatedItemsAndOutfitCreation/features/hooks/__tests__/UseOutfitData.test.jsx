import { renderHook, act, waitFor } from '@testing-library/react';
import { useOutfitData } from '../UseOutfitData.jsx';
import {
  fetchOutfitProductIds,
  addProductByIdToOutfit,
  removeProductByIdFromOutfit,
} from '../../../api.js';

jest.mock('../../../api.js', () => ({
  fetchOutfitProductIds: jest.fn(),
  addProductByIdToOutfit: jest.fn(),
  removeProductByIdFromOutfit: jest.fn(),
}));

describe('useOutfitData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', async () => {
    fetchOutfitProductIds.mockResolvedValueOnce([]);
    const { result } = renderHook(() => useOutfitData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.outfitIds).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should fetch outfit ids on mount', async () => {
    const mockIds = ['1', '2', '3'];
    fetchOutfitProductIds.mockResolvedValueOnce(mockIds);

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.outfitIds).toEqual(mockIds);
    expect(result.current.error).toBe(null);
  });

  it('should handle error when fetching outfit ids', async () => {
    fetchOutfitProductIds.mockRejectedValueOnce(new Error('API Error'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe(
      'Failed to load outfit. Please try again later.',
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching outfit:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it('should add product to outfit', async () => {
    const initialIds = ['1', '2'];
    const updatedIds = ['1', '2', '3'];
    fetchOutfitProductIds.mockResolvedValueOnce(initialIds);
    addProductByIdToOutfit.mockResolvedValueOnce(
      updatedIds.map((id) => ({ id })),
    );

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addProduct('3');
    });

    expect(result.current.outfitIds).toEqual(updatedIds);
  });

  it('should remove product from outfit', async () => {
    const initialIds = ['1', '2', '3'];
    const updatedIds = ['1', '3'];
    fetchOutfitProductIds.mockResolvedValueOnce(initialIds);
    removeProductByIdFromOutfit.mockResolvedValueOnce(
      updatedIds.map((id) => ({ id })),
    );

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.removeProduct('2');
    });

    expect(result.current.outfitIds).toEqual(updatedIds);
  });

  it('should handle error when adding product', async () => {
    fetchOutfitProductIds.mockResolvedValueOnce([]);
    addProductByIdToOutfit.mockRejectedValueOnce(new Error('API Error'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addProduct('1');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hook: Error adding product to outfit:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it('should handle error when removing product', async () => {
    fetchOutfitProductIds.mockResolvedValueOnce(['1']);
    removeProductByIdFromOutfit.mockRejectedValueOnce(new Error('API Error'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useOutfitData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.removeProduct('1');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error removing product from outfit:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
