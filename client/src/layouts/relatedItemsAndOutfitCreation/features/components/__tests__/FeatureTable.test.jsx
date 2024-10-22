import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureTable from '../FeatureTable';
import * as utils from '../../../utils.js';

jest.mock('../../../utils.js', () => ({
  getFeatureValue: jest.fn(),
  createFeatureMap: jest.fn(),
  getAllFeatureNames: jest.fn(),
}));

describe('FeatureTable Component', () => {
  const mockRelatedProduct = {
    name: 'Related Product',
    features: [
      { feature: 'Material', value: 'Cotton' },
      { feature: 'Color', value: 'Blue' },
    ],
  };

  const mockSelectedProduct = {
    name: 'Selected Product',
    features: [
      { feature: 'Material', value: 'Polyester' },
      { feature: 'Size', value: 'Large' },
    ],
  };

  beforeEach(() => {
    utils.getFeatureValue.mockImplementation((features, featureName) => {
      const feature = features.find((f) => f.feature === featureName);
      return feature ? feature.value : '-';
    });
    utils.createFeatureMap.mockReturnValue(
      new Map([
        ['Material', 'Cotton'],
        ['Color', 'Blue'],
      ]),
    );
    utils.getAllFeatureNames.mockReturnValue(
      new Set(['Material', 'Color', 'Size']),
    );
  });

  test('renders table with correct headers', () => {
    render(
      <FeatureTable
        relatedProduct={mockRelatedProduct}
        selectedProduct={mockSelectedProduct}
      />,
    );

    expect(screen.getByText('Related Product')).toBeInTheDocument();
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Selected Product')).toBeInTheDocument();
  });

  test('renders feature rows correctly', () => {
    render(
      <FeatureTable
        relatedProduct={mockRelatedProduct}
        selectedProduct={mockSelectedProduct}
      />,
    );

    expect(screen.getByText('Cotton')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Polyester')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  test('handles missing features correctly', () => {
    utils.getFeatureValue.mockReturnValue('-');
    render(
      <FeatureTable
        relatedProduct={mockRelatedProduct}
        selectedProduct={mockSelectedProduct}
      />,
    );

    const dashElements = screen.getAllByText('-');
    expect(dashElements.length).toBeGreaterThan(0);
  });

  test('displays error message for invalid features', () => {
    const invalidProduct = { name: 'Invalid', features: 'Not an array' };
    const originalError = console.error;
    console.error = jest.fn();
    render(
      <FeatureTable
        relatedProduct={invalidProduct}
        selectedProduct={invalidProduct}
      />,
    );

    expect(screen.getByText('Invalid product features')).toBeInTheDocument();
    console.error = originalError;
  });

  test('calls utility functions with correct arguments', () => {
    render(
      <FeatureTable
        relatedProduct={mockRelatedProduct}
        selectedProduct={mockSelectedProduct}
      />,
    );

    expect(utils.createFeatureMap).toHaveBeenCalledWith(
      mockRelatedProduct.features,
    );
    expect(utils.getAllFeatureNames).toHaveBeenCalledWith(
      mockRelatedProduct.features,
      mockSelectedProduct.features,
    );
    expect(utils.getFeatureValue).toHaveBeenCalled();
  });
});
