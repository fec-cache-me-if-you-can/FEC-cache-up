import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselThumbnail from '../../../components/CarouselThumbnail.jsx';
import Icon from '../../../components/icons.jsx';

export default function ImageGallery({ photos }) {
  const [imageGallery, setImageGallery] = useState([]);
  const [index, setIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [visibleThumbnails, setVisibleThumbnails] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState('');

  const maxThumbnails = 5;

  useEffect(() => {
    const photosArray = photos.map((photo) => photo.url);
    const thumbnailArray = photos.map((photo) => photo.thumbnail_url);
    setImageGallery(photosArray);
    setSelectedImage(photosArray[0]);
    setThumbnails(thumbnailArray);
    setVisibleThumbnails(thumbnailArray.slice(0, maxThumbnails));
    setSelectedThumbnail(thumbnailArray[0]);
  }, [photos]);

  const handleThumbnail = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    const i = thumbnails.indexOf(thumbnail);
    setIndex(i);
    setSelectedImage(imageGallery[i]);
  };

  const scrollThumbnailsUp = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setVisibleThumbnails(
        thumbnails.slice(newIndex, newIndex + maxThumbnails),
      );
    }
  };

  const scrollThumbnailsDown = () => {
    if (index + maxThumbnails < thumbnails.length) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setVisibleThumbnails(
        thumbnails.slice(newIndex, newIndex + maxThumbnails),
      );
    }
  };

  const thumbnailGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '5px',
    justifyContent: 'center',
    maxWidth: '70px',
    margin: '0 5px',
  };

  return (
    <div className="container">
      <div className="row">
        {/* Thumbnails Column */}
        <div className="col-2 d-flex flex-column align-items-center">
          {/* Up Arrow */}
          {index > 0 && (
            <div onClick={scrollThumbnailsUp} style={{ cursor: 'pointer' }}>
              <Icon icon="fa-chevron-up" />
            </div>
          )}
          <div className="style-thumbnails" style={thumbnailGridStyle}>
            {visibleThumbnails.map((thumbnail) => (
              <CarouselThumbnail
                key={thumbnail}
                selected={thumbnail === selectedThumbnail}
                imageUrl={thumbnail}
                onClick={() => handleThumbnail(thumbnail)}
              />
            ))}
          </div>

          {/* Down Arrow */}
          {index + maxThumbnails < thumbnails.length && (
            <div onClick={scrollThumbnailsDown} style={{ cursor: 'pointer' }}>
              <Icon icon="fa-chevron-down" />
            </div>
          )}
        </div>

        {/* Main Image */}
        <div className="col-10 d-flex justify-content-center align-items-center">
          <div
            className="main-image"
            style={{
              width: '700px',
              height: '550px',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
              margin: '10px',
            }}
          >
            <img
              src={selectedImage}
              alt="Main Product"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  //   (
  //   <div>
  //     <div className="style-thumbnails" style={thumbnailGridStyle}>
  //       {thumbnails.map((thumbnail) => (
  //         <CarouselThumbnail
  //           selected={thumbnail === selectedThumbnail}
  //           imageUrl={thumbnail}
  //           onClick={() => handleThumbnail(thumbnail)}
  //         />
  //       ))}
  //     </div>

  //     <div
  //       className="main-image"
  //       style={{
  //         width: '700px',
  //         height: '600px',
  //         position: 'relative',
  //         overflow: 'hidden',
  //         display: 'inline-block',
  //         margin: '10px',
  //       }}
  //     >
  //       <img
  //         src={selectedImage}
  //         style={{
  //           width: '100%',
  //           height: '100%',
  //           objectFit: 'contain',
  //           objectPosition: 'center',
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
}

ImageGallery.propTypes = { photos: PropTypes.array };
