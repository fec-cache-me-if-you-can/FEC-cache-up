import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './layouts/productDetails/index.jsx';
import RatingsAndReviews from './layouts/ratingsAndReviews/index.jsx';
import QuestionsAndAnswers from './layouts/questionsAndAnswers/index.jsx';
import RelatedItemsAndOutfitCreation from './layouts/relatedItemsAndOutfitCreation/index.jsx';
import NavBar from './layouts/navBar/index.jsx';

const DEFAULT_PRODUCT_ID = 40344;

export default function App() {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [product, setProduct] = useState({ id: DEFAULT_PRODUCT_ID });
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [metaReviews, setMetaReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }, []);

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
    <div id="app" className="app bg-main d-flex flex-column min-vh-100">
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div className="d-flex flex-column align-content-center align-items-center justify-content-center flex-grow-1">
        <div
          className="container-lg mt-5 pt-5 mx-3 mx-sm-0"
          id="product-details"
        >
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
        <div className="container-lg mx-3 mx-sm-0" id="related-products">
          {productId && (
            <RelatedItemsAndOutfitCreation
              productId={String(product.id)}
              setProductId={setProductId}
            />
          )}
          <div className="border-bottom border-bottom-thick border-primary mt-5 pt-5"></div>
        </div>
        {productId && (
          <div className="container-lg mx-3 mx-sm-0" id="q-a">
            <QuestionsAndAnswers
              productId={productId}
              productName={product.name}
            />
            <div className="border-bottom border-bottom-thick border-primary mt-5 pt-5"></div>
          </div>
        )}
        <div className="container-lg mx-3 mx-sm-0" id="reviews">
          <RatingsAndReviews
            metaReviews={metaReviews}
            product={product}
            rating={rating}
            numberOfRatings={numberOfRatings}
          />
        </div>
      </div>
      <div
        className="d-flex w-100 justify-content-center align-items-center bg-black text-white py-3 mt-5"
        style={{ height: '100px' }}
      >
        <p className="m-0">© 2021 Cache Me Ouside</p>
      </div>
    </div>
  );
}
