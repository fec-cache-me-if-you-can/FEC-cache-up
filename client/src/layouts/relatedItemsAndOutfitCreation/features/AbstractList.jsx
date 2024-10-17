import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

const AbstractList = ({
  items = [],
  isLoading = false,
  error = '',
  heading = '',
  CardComponent,
  action,
}) => {
  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="secondary-color">{error}</p>;
    if (!items.length) return <p>No items found</p>;

    return (
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop
        centeredSlides
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {items.map((itemId, index) => (
          <div key={`${itemId}-${index}`} className="container bg-secondary">
            <SwiperSlide>
              <CardComponent productId={itemId} action={action} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="container flex-grow-1">
      <h5 className="section-header">{heading}</h5>
      {renderContent()}
    </div>
  );
};

AbstractList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  heading: PropTypes.string,
  CardComponent: PropTypes.elementType.isRequired,
  action: PropTypes.func,
};

export default AbstractList;
