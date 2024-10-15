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
  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/products/${productId}/related`);
      console.log('Related products: ', response.data);
      setRelatedProducts(response.data);
    } catch (error) {
      console.log('Error fetching related products: ', error);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);

  return (
    <div className="container flex-grow-1">
      <h5>Related Products</h5>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {relatedProducts.map((id) => {
          return (
            <div key={id} className="container bg-secondary">
              <SwiperSlide>
                <RelatedProductCard productId={id} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

RelatedProductList.propTypes = {
  productId: PropTypes.string,
};

export default RelatedProductList;
