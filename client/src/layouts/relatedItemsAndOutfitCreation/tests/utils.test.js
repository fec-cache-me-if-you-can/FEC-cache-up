import {
  calculateAverageRating,
  processProductData,
  getFeatureValue,
  createFeatureMap,
  getAllFeatureNames,
} from '../utils.js';

describe('Utility Functions', () => {
  describe('calculateAverageRating', () => {
    it('calculates average rating correctly', () => {
      const ratings = { 1: '10', 2: '5', 3: '15', 4: '20', 5: '50' };
      expect(calculateAverageRating(ratings)).toBe(3.95);
    });

    it('returns 0 when there are no ratings', () => {
      expect(calculateAverageRating({})).toBe(0);
    });

    it('handles ratings with zero counts', () => {
      const ratings = { 1: '0', 2: '0', 3: '15', 4: '0', 5: '50' };
      expect(calculateAverageRating(ratings)).toBe(4.54);
    });
  });

  describe('processProductData', () => {
    it('processes product data correctly', () => {
      const productInfo = {
        id: 1,
        name: 'Test Product',
        category: 'Test Category',
      };
      const styleInfo = {
        results: [{ original_price: '100', photos: [{ url: 'test.jpg' }] }],
      };
      const reviewMeta = { ratings: { 4: '10', 5: '10' } };

      const result = processProductData({ productInfo, styleInfo, reviewMeta });

      expect(result).toEqual({
        id: '1',
        name: 'Test Product',
        category: 'Test Category',
        price: '100',
        imageUrl: 'test.jpg',
        rating: 4.5,
      });
    });
  });

  describe('getFeatureValue', () => {
    const features = [
      { feature: 'Material', value: 'Cotton' },
      { feature: 'Color', value: 'Blue' },
    ];

    it('returns correct value for existing feature', () => {
      expect(getFeatureValue(features, 'Material')).toBe('Cotton');
    });

    it('returns "-" for non-existing feature', () => {
      expect(getFeatureValue(features, 'Size')).toBe('-');
    });
  });

  describe('createFeatureMap', () => {
    it('creates correct feature map', () => {
      const features = [
        { feature: 'Material', value: 'Cotton' },
        { feature: 'Color', value: 'Blue' },
      ];
      const map = createFeatureMap(features);
      expect(map.get('Material')).toBe('Cotton');
      expect(map.get('Color')).toBe('Blue');
    });
  });

  describe('getAllFeatureNames', () => {
    it('returns all unique feature names', () => {
      const relatedFeatures = [{ feature: 'Material' }, { feature: 'Color' }];
      const selectedFeatures = [{ feature: 'Size' }, { feature: 'Material' }];
      const result = getAllFeatureNames(relatedFeatures, selectedFeatures);
      expect(result).toEqual(new Set(['Material', 'Color', 'Size']));
    });
  });
});
