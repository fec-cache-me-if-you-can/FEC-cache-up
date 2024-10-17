// ProductComparisonModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import FeatureTable from './FeatureTable.jsx';

const ProductComparisonModal = ({
  show,
  onHide,
  relatedProduct,
  selectedProduct,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="square px-5 py-4"
      size="lg"
    >
      <Modal.Header closeButton className="border-0 d-flex align-items-start">
        <Modal.Title className="mt-1 fw-medium">COMPARISON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="fs-6 fw-light">
          <FeatureTable
            relatedProduct={relatedProduct}
            selectedProduct={selectedProduct}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

ProductComparisonModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  relatedProduct: PropTypes.object.isRequired,
  selectedProduct: PropTypes.object.isRequired,
};

export default ProductComparisonModal;
