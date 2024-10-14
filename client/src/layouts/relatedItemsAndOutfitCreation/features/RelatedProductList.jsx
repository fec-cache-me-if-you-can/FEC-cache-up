import React, { useState, useEffect } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

const RelatedProductList = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/products/${productId}/related`);
      setRelatedProducts(data);
    } catch (err) {
      setError('Failed to fetch related products. Please try again later.');
      console.error('Error fetching related products: ', err);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);

  const renderRelatedProducts = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return relatedProducts.map((relatedProductId) => (
      <SwiperSlide key={relatedProductId}>
        <RelatedProductCard productId={relatedProductId} />
      </SwiperSlide>
    ));
  };

  return (
    <div className="related-products-container">
      <h5 className="my-5">Related Products</h5>
      <div className="swiper-container my-5">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {renderRelatedProducts()}
        </Swiper>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

RelatedProductList.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RelatedProductList;
