import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './layouts/productDetails/index.jsx';
import RatingsAndReviews from './layouts/ratingsAndReviews/index.jsx';
import QuestionsAndAnswers from './layouts/questionsAndAnswers/index.jsx';
import RelatedItemsAndOutfitCreation from './layouts/relatedItemsAndOutfitCreation/index.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';

const DEFAULT_PRODUCT_ID = 40344;

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
};
export default function App() {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [product, setProduct] = useState({ id: DEFAULT_PRODUCT_ID });
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [metaReviews, setMetaReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);

  // Fetch product data
  useEffect(() => {
    axios
      .get(`/products/${productId}/information`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      })
      .finally(() => setLoadingProduct(false));
  }, [productId]);

  //pull info on reviews
  useEffect(() => {
    if (product.id) {
      axios
        .get(`reviews/meta?product_id=${product.id}`)
        .then((response) => {
          const totalReviews = Object.values(response.data.ratings).reduce(
            (sum, count) => sum + parseInt(count, 10),
            0,
          );
          const averageScore =
            totalReviews > 0
              ? Object.entries(response.data.ratings).reduce(
                  (sum, [rating, count]) => sum + rating * count,
                  0,
                ) / totalReviews
              : 0;
          setRating(averageScore);
          setNumberOfRatings(totalReviews);
          setMetaReviews(response.data);
        })
        .catch((error) => {
          console.error('Error fetching reviews metadata:', error);
        });
    }
  }, [product.id]);

  return (
    <div id="app" className="container my-5">
      <div className="text-center mb-4">
        <PrimaryButton onClick={toggleTheme} label="Toggle Theme" />
      </div>
      <div className="my-4">
        {loadingProduct ? (
          <p>Loading product...</p>
        ) : (
          <ProductDetails
            product={product}
            rating={rating}
            numberOfRatings={numberOfRatings}
          />
        )}
      </div>
      <div className="my-4">
        <RatingsAndReviews
          metaReviews={metaReviews}
          product={product}
          rating={rating}
          numberOfRatings={numberOfRatings}
        />
      </div>
      <div className="my-4">
        <QuestionsAndAnswers />
      </div>
      <div className="my-4">
        {productId && (
          <RelatedItemsAndOutfitCreation
            productId={String(product.id)}
            setProductId={setProductId}
          />
        )}
      </div>
    </div>
  );
}
