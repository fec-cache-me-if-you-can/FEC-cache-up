import axios from 'axios';
import {
  fetchRelatedProductIds,
  fetchOutfitProductIds,
  addProductByIdToOutfit,
  removeProductByIdFromOutfit,
  fetchProductFeaturesById,
  fetchProductInformationById,
  fetchCompleteProductDataById,
} from '../api';

jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRelatedProductIds', () => {
    it('should fetch and return related product IDs', async () => {
      axios.get.mockResolvedValueOnce({ data: [1, 2, 3] });
      const result = await fetchRelatedProductIds('123');
      expect(result).toEqual(['1', '2', '3']);
      expect(axios.get).toHaveBeenCalledWith('/products/123/related');
    });

    it('should throw ApiError on failure', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network error'));
      await expect(fetchRelatedProductIds('123')).rejects.toThrow(
        'Failed to fetch related product IDs for 123',
      );
    });
  });

  describe('fetchOutfitProductIds', () => {
    it('should fetch and return outfit product IDs', async () => {
      axios.get.mockResolvedValueOnce({ data: [{ id: '1' }, { id: '2' }] });
      const result = await fetchOutfitProductIds();
      expect(result).toEqual(['1', '2']);
      expect(axios.get).toHaveBeenCalledWith('/outfit');
    });
  });

  describe('addProductByIdToOutfit', () => {
    it('should add product to outfit', async () => {
      axios.post.mockResolvedValueOnce({ data: { success: true } });
      await addProductByIdToOutfit('123');
      expect(axios.post).toHaveBeenCalledWith('/outfit', { id: '123' });
    });

    it('should reject with error if productId is not provided', async () => {
      await expect(addProductByIdToOutfit()).rejects.toThrow(
        'Product ID is required',
      );
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  describe('removeProductByIdFromOutfit', () => {
    it('should remove product from outfit', async () => {
      axios.delete.mockResolvedValueOnce({ data: { success: true } });
      await removeProductByIdFromOutfit('123');
      expect(axios.delete).toHaveBeenCalledWith('/outfit/123');
    });

    it('should reject with error if productId is not provided', async () => {
      await expect(removeProductByIdFromOutfit()).rejects.toThrow(
        'Product ID is required',
      );
      expect(axios.delete).not.toHaveBeenCalled();
    });
  });

  describe('fetchProductFeaturesById', () => {
    it('should fetch product features', async () => {
      axios.get.mockResolvedValueOnce({
        data: { features: ['feature1', 'feature2'] },
      });
      const result = await fetchProductFeaturesById('123');
      expect(result).toEqual(['feature1', 'feature2']);
      expect(axios.get).toHaveBeenCalledWith('/products/123/information');
    });

    it('should reject with error if productId is not provided', async () => {
      await expect(fetchProductFeaturesById()).rejects.toThrow(
        'Product ID is required',
      );
      expect(axios.get).not.toHaveBeenCalled();
    });
  });

  describe('fetchProductInformationById', () => {
    it('should fetch product information', async () => {
      const mockData = { id: '123', name: 'Test Product' };
      axios.get.mockResolvedValueOnce({ data: mockData });
      const result = await fetchProductInformationById('123');
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('/products/123/information');
    });

    it('should reject with error if productId is not provided', async () => {
      await expect(fetchProductInformationById()).rejects.toThrow(
        'Product ID is required',
      );
      expect(axios.get).not.toHaveBeenCalled();
    });
  });

  describe('fetchCompleteProductDataById', () => {
    it('should fetch complete product data', async () => {
      const mockProductInfo = { id: '123', name: 'Test Product' };
      const mockStyleInfo = { results: [{ style_id: 1 }] };
      const mockReviewMeta = { ratings: { 5: 1 } };

      axios.get
        .mockResolvedValueOnce({ data: mockProductInfo })
        .mockResolvedValueOnce({ data: mockStyleInfo })
        .mockResolvedValueOnce({ data: mockReviewMeta });

      const result = await fetchCompleteProductDataById('123');
      expect(result).toEqual({
        productInfo: mockProductInfo,
        styleInfo: mockStyleInfo,
        reviewMeta: mockReviewMeta,
      });

      expect(axios.get).toHaveBeenCalledTimes(3);
      expect(axios.get).toHaveBeenCalledWith('/products/123/information');
      expect(axios.get).toHaveBeenCalledWith('/products/123/styles');
      expect(axios.get).toHaveBeenCalledWith('/reviews/meta?product_id=123');
    });

    it('should reject with error if productId is not provided', async () => {
      await expect(fetchCompleteProductDataById()).rejects.toThrow(
        'Product ID is required',
      );
      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
