import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import AddToOutfitCard from './components/AddToOutfitCard.jsx';
import Icon from '@/components/icons.jsx';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';

const AbstractList = ({
  items = [],
  isLoading = false,
  error = '',
  heading = '',
  CardComponent,
  action = () => {},
  isOutfit = false,
  selectedProduct = '',
  handleAddToOutfit = () => {},
  setProductId = () => {},
}) => {
  const renderLoadingMessage = () => (
    <LoadingSpinner aria-label="Loading content" />
  );

  const renderErrorMessage = () => (
    <p
      className="error-message text-center secondary-color"
      role="alert"
      aria-live="assertive"
    >
      {error}
    </p>
  );

  const renderNoItemsMessage = () => (
    <p
      data-testid="no-items-message"
      className="text-center text-secondary"
      role="status"
      aria-live="polite"
    >
      You don&apos;t have any items added to your outfit.
    </p>
  );

  const renderNavigationButton = (direction) => (
    <button
      id={`custom-swiper-button-${direction}-${isOutfit}`}
      className={`transparent-button custom-swiper-button-${direction} m-2 z-0 d-none d-md-block`}
      aria-label={`Scroll ${direction}`}
      tabIndex="0"
    >
      <Icon
        icon={`fa-chevron-${direction === 'prev' ? 'left' : 'right'}`}
        className="fs-3"
        aria-hidden="true"
      />
    </button>
  );

  const renderSwiperCarousel = () => {
    const hasMultipleItems = items.length > 3;

    return (
      <section
        className="abstract-list-container d-flex"
        aria-label="Product carousel"
      >
        {hasMultipleItems && renderNavigationButton('prev')}
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          loop
          centeredSlides
          navigation={{
            prevEl: `#custom-swiper-button-prev-${isOutfit}`,
            nextEl: `#custom-swiper-button-next-${isOutfit}`,
          }}
          modules={hasMultipleItems ? [Navigation] : []}
          className="mySwiper"
          watchOverflow
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1300: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {items.map((itemId, index) => (
            <SwiperSlide
              key={`${itemId}-${index}`}
              role="group"
              aria-roledescription="slide"
            >
              <div className="d-flex align-items-center justify-content-center">
                <CardComponent
                  productId={itemId}
                  action={action}
                  setProductId={setProductId}
                  aria-label={`Product card for item ${itemId}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {hasMultipleItems && renderNavigationButton('next')}
      </section>
    );
  };

  const renderContent = () => {
    if (isLoading) return renderLoadingMessage();
    if (error) return renderErrorMessage();
    if (items.length === 0) return renderNoItemsMessage();
    return renderSwiperCarousel();
  };

  return (
    <main>
      <header>
        <h5 className="section-header">
          {heading}
          {isOutfit && (
            <AddToOutfitCard
              productId={selectedProduct}
              action={handleAddToOutfit}
              items={items}
              aria-label="Add to outfit card"
            />
          )}
        </h5>
      </header>
      <div className="bg-secondary z-n1 section">{renderContent()}</div>
    </main>
  );
};

AbstractList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  heading: PropTypes.string,
  CardComponent: PropTypes.elementType.isRequired,
  action: PropTypes.func,
  isOutfit: PropTypes.bool,
  selectedProduct: PropTypes.string,
  handleAddToOutfit: PropTypes.func,
  setProductId: PropTypes.func,
};

export default AbstractList;
