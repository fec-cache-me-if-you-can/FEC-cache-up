import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductComparisonModal from '../ProductComparisonModal';

jest.mock('../FeatureTable.jsx', () => {
  // eslint-disable-next-line react/prop-types
  return function MockFeatureTable({ relatedProduct, selectedProduct }) {
    return (
      /* eslint-disable */
      <div data-testid="feature-table">
        Mock Feature Table for {relatedProduct.name} and {selectedProduct.name}
      </div>
        /* eslint-enable */
    );
  };
});

describe('ProductComparisonModal Component', () => {
  const mockRelatedProduct = { name: 'Related Product', features: [] };
  const mockSelectedProduct = { name: 'Selected Product', features: [] };
  const mockOnHide = jest.fn();

  const renderModal = (show = true) => {
    render(
      <ProductComparisonModal
        show={show}
        onHide={mockOnHide}
        relatedProduct={mockRelatedProduct}
        selectedProduct={mockSelectedProduct}
      />,
    );
  };

  beforeEach(() => {
    mockOnHide.mockClear();
  });

  test('renders modal when show is true', () => {
    renderModal(true);
    expect(screen.getByText('COMPARISON')).toBeInTheDocument();
  });

  test('does not render modal when show is false', () => {
    renderModal(false);
    expect(screen.queryByText('COMPARISON')).not.toBeInTheDocument();
  });

  test('renders FeatureTable with correct props', () => {
    renderModal();
    expect(screen.getByTestId('feature-table')).toHaveTextContent(
      'Mock Feature Table for Related Product and Selected Product',
    );
  });

  test('has correct modal classes', () => {
    renderModal();
    const modalDialog = screen.getByRole('dialog').firstChild; // eslint-disable-line
    expect(modalDialog).toHaveClass(
      'modal-dialog',
      'modal-dialog-centered',
      'modal-lg',
    );
    const modalContent = modalDialog.firstChild; // eslint-disable-line
    expect(modalContent).toHaveClass('modal-content', 'square', 'px-5', 'py-4');
  });

  test('has correct header classes', () => {
    renderModal();
    const header = screen.getByText('COMPARISON').closest('.modal-header'); // eslint-disable-line
    expect(header).toHaveClass('border-0', 'd-flex', 'align-items-start');
  });

  test('has correct body classes', () => {
    renderModal();
    const body = screen.getByTestId('feature-table').closest('.modal-body'); // eslint-disable-line
    expect(body.firstChild).toHaveClass('fs-6', 'fw-light'); // eslint-disable-line
  });
});
