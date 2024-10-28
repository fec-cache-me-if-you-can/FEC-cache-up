import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCompleteProductDataById } from '../../api.js';
import { processProductData } from '../../utils.js';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import ProductImage from './ProductImage.jsx';
import Placeholder from './Placeholder.jsx';
import ProductDetails from './ProductDetails.jsx';

const AbstractProductCard = ({ productId, renderIcon, setProductId }) => {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  const handleCardClick = () => {
    setProductId(productId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const fetchAndProcessProductData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const productData = await fetchCompleteProductDataById(productId);
      const processedDetails = processProductData(productData);
      setProductDetails(processedDetails);
      setFetchError(null);
    } catch (error) {
      console.error(`Error fetching product data for ID ${productId}:`, error);
      setFetchError('Failed to load product data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchAndProcessProductData();
  }, [productId, fetchAndProcessProductData]);

  const renderImageSection = () => (
    <div
      className="ratio d-flex justify-content-center align-items-center"
      style={{ '--bs-aspect-ratio': '90%' }}
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${productDetails?.name}`}
      aria-pressed="false"
      onKeyDown={(e) => e.key === 'Enter' && setProductId(productId)}
    >
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center w-100 h-100"
          role="status"
          aria-live="polite"
        >
          <LoadingSpinner size={48} />
        </div>
      ) : (
        <ProductImage
          src={productDetails?.imageUrl}
          alt={productDetails?.name || 'Product image'}
        />
      )}
    </div>
  );

  const renderDetailsSection = () => (
    <div className="card-body p-3 py-2 position-relative">
      {isLoading ? (
        <Placeholder />
      ) : (
        <ProductDetails
          details={productDetails}
          renderIcon={renderIcon}
          setProductId={setProductId}
        />
      )}
    </div>
  );

  if (fetchError) {
    return <div className="error-message">{fetchError}</div>;
  }

  return (
    <article
      className="card square border-05 cursor-pointer card-border"
      style={{ width: '15rem' }}
    >
      {renderImageSection()}
      {renderDetailsSection()}
    </article>
  );
};

AbstractProductCard.propTypes = {
  productId: PropTypes.string,
  renderIcon: PropTypes.func,
  setProductId: PropTypes.func,
};

export default AbstractProductCard;
