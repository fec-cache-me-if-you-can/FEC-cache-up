import React, { useState, useEffect } from 'react';
import OutfitCard from './OutfitCard.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

const OutfitList = () => {
  const [outfitIds, setOutfitIds] = useState([]);

  const mockOutfitIds = [
    40345, 40346, 40351, 40350, 40349, 40349, 40351, 40352, 40344, 40346,
  ];

  useEffect(() => {
    // TODO: fetch users outfitIds from the server
    setOutfitIds(mockOutfitIds);
  }, []);

  // TODO: implement static "add" card
  return (
    <div className="container flex-grow-1">
      <h5>Your Outfit</h5>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {outfitIds.map((id) => {
          return (
            <div key={id} className="container bg-secondary">
              <SwiperSlide>
                <OutfitCard productId={id} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default OutfitList;
