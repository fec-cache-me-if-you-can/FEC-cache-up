import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';
import FavoriteToggle from './favoriteToggle.jsx';
import {
  getProductInformation,
  getProductStyles,
  getProductReviewsMeta,
} from './api.js';
import { calculateAverageRating } from './utils';

const RelatedProductCard = ({ productId, toggleFavorite }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: 0,
    rating: 0,
    imageUrl: '',
  });
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const [productInfo, styleInfo, reviewMeta] = await Promise.all([
          getProductInformation(productId),
          getProductStyles(productId),
          getProductReviewsMeta(productId),
        ]);

        const { name, category } = productInfo;
        const { original_price: price, photos } = styleInfo.results[0];
        const imageUrl = photos[0].url;
        const rating = calculateAverageRating(reviewMeta.ratings);

        setProductDetails({
          name,
          category,
          price,
          imageUrl,
          rating,
        });
        setFetchError(null);
      } catch (error) {
        console.error(error);
        setFetchError(error.message);
      }
    };

    loadProductData();
  }, [productId]);

  if (fetchError) {
    return <div className="error-message">{fetchError}</div>;
  }

  return (
    <div
      className="card square border-05 border-dark cursor-pointer"
      style={{ width: '18rem' }}
    >
      <div className="ratio" style={{ '--bs-aspect-ratio': '100%' }}>
        <img
          src={productDetails.imageUrl}
          alt={productDetails.name}
          className="card-img-top object-fit-cover"
        />
      </div>
      <div className="position-absolute top-1 end-0 p-2 pe-3 text-size-300 hover">
        <FavoriteToggle onToggle={toggleFavorite}></FavoriteToggle>
      </div>
      <div className="card-body p-2">
        <p className="card-text fw-light h5 text-size-90 mt-0 mb-2">
          {productDetails.category.toUpperCase()}
        </p>
        <h5 className="card-title my-1 text-size-300 fw-semibold text-dark two-line-title">
          {productDetails.name}
        </h5>
        <p className="text-size-80 my-2">${productDetails.price}</p>
        <StarRating rating={productDetails.rating} />
      </div>
    </div>
  );
};

RelatedProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
};

RelatedProductCard.displayName = 'RelatedProductCard';

export default RelatedProductCard;
