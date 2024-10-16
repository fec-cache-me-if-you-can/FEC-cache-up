import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

const AbstractList = ({
  items,
  isLoading,
  error,
  heading,
  CardComponent,
  action,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="secondary-color">{error}</p>;
  }

  if (!items.length) {
    return (
      <div className="container flex-grow-1">
        <h5>{heading}</h5>
        <p>No items found</p>
      </div>
    );
  }

  return (
    <div className="container flex-grow-1">
      <h5>{heading}</h5>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop
        centeredSlides
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {items.map((id, i) => (
          <div key={id + 'i'} className="container bg-secondary">
            <SwiperSlide>
              <CardComponent productId={id} action={action} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

AbstractList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  heading: PropTypes.string,
  CardComponent: PropTypes.elementType.isRequired,
};

export default AbstractList;
