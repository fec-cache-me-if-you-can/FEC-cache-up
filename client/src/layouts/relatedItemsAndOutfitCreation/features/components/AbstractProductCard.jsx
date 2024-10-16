import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchProductData } from '../../api.js';
import { processProductData } from '../../utils.js';
import LoadingSpinner from '../../../../components/LoadingSpinner.jsx';
import ProductImage from './ProductImage.jsx';
import Placeholder from './Placeholder.jsx';
import ProductDetails from './ProductDetails.jsx';

const AbstractProductCard = ({ productId, renderIcon }) => {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      try {
        const productData = await fetchProductData(productId);
        const details = processProductData(productData);
        setProductDetails(details);
        setFetchError(null);
      } catch (error) {
        console.error(error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductData();
  }, [productId]);

  if (fetchError) {
    return <div className="error-message">{fetchError}</div>;
  }

  return (
    <div
      className="card square border-05 cursor-pointer card-border"
      style={{ width: '20rem' }}
    >
      <div
        className="ratio d-flex justify-content-center align-items-center"
        style={{ '--bs-aspect-ratio': '100%' }}
      >
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <LoadingSpinner size={48} />
          </div>
        ) : (
          <ProductImage
            src={productDetails.imageUrl}
            alt={productDetails.name}
          />
        )}
      </div>
      <div className="card-body p-3 py-2 position-relative">
        {isLoading ? (
          <Placeholder />
        ) : (
          <ProductDetails details={productDetails} renderIcon={renderIcon} />
        )}
      </div>
    </div>
  );
};

AbstractProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
};

export default AbstractProductCard;
