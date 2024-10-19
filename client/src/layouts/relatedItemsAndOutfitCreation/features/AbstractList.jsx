import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import AddToOutfitCard from './components/AddToOutfitCard.jsx';

const AbstractList = ({
  items = [],
  isLoading = false,
  error = '',
  heading = '',
  CardComponent,
  action,
  isOutfit = false,
  selectedProduct,
  handleAddToOutfit,
  setProductId,
}) => {
  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="secondary-color">{error}</p>;

    return (
      <div
        className="d-flex flex-nowrap justify-content-between align-items-stretch"
        style={{ minHeight: '20rem', transition: 'height 0.5s' }}
      >
        {isOutfit && (
          <AddToOutfitCard
            productId={selectedProduct}
            action={handleAddToOutfit}
          />
        )}
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop
          centeredSlides
          navigation
          modules={[Navigation]}
          className="mySwiper"
        >
          {items.map((itemId, index) => (
            <div key={`${itemId}-${index}`} className="container bg-secondary">
              <SwiperSlide key={`${itemId}-${index}`}>
                <CardComponent
                  productId={itemId}
                  action={action}
                  setProductId={setProductId}
                />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
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
  items: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  heading: PropTypes.string,
  CardComponent: PropTypes.elementType,
  action: PropTypes.func,
  isOutfit: PropTypes.bool,
  selectedProduct: PropTypes.string,
  handleAddToOutfit: PropTypes.func,
  setProductId: PropTypes.func,
};

export default AbstractList;
