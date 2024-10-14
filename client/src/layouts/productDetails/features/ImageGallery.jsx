import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselThumbnail from '../../../components/CarouselThumbnail.jsx';

export default function ImageGallery({ photos }) {
  const [imageGallery, setImageGallery] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState('');

  useEffect(() => {
    const photosArray = photos.map((photo) => photo.url);

    const thumbnailArray = photos.map((photo) => photo.thumbnail_url);
    setImageGallery(photosArray);
    setSelectedImage(photosArray[0]);
    setThumbnails(thumbnailArray);
    setSelectedThumbnail(thumbnailArray[0]);
  }, [photos]);

  console.log('photos in gallery: ', photos);

  const handleThumbnail = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    const index = thumbnails.indexOf(thumbnail);
    setSelectedImage(imageGallery[index]);
  };

  const thumbnailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, auto)',
    gap: '5px',
    justifyContent: 'left',
    maxWidth: '500px',
    margin: '0 5px',
  };

  return (
    <div>
      <div className="style-thumbnails" style={thumbnailGridStyle}>
        {thumbnails.map((thumbnail) => (
          <CarouselThumbnail
            selected={thumbnail === selectedThumbnail}
            imageUrl={thumbnail}
            onClick={() => handleThumbnail(thumbnail)}
          />
        ))}
      </div>

      <div
        className="main-image"
        style={{
          width: '700px',
          height: '600px',
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block',
          margin: '10px',
        }}
      >
        <img
          src={selectedImage}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
    </div>
  );
}

ImageGallery.propTypes = { photos: PropTypes.array };
