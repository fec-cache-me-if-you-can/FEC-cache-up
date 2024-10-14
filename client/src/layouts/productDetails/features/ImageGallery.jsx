import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselThumbnail from '../../../components/CarouselThumbnail.jsx';
import Icon from '../../../components/icons.jsx';

export default function ImageGallery({ photos }) {
  const [imageGallery, setImageGallery] = useState([]);
  const [index, setIndex] = useState(0);
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

  const handleThumbnail = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    const i = thumbnails.indexOf(thumbnail);
    setIndex(i);
    setSelectedImage(imageGallery[i]);
  };

  const thumbnailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, auto)',
    gap: '5px',
    justifyContent: 'left',
    maxWidth: '500px',
    margin: '0 5px',
  };

  return (
    <div className="container">
      <div className="row">
        {/* Thumbnails Column */}
        <div className="col-2 d-flex flex-column align-items-center">
          {thumbnails.map((thumbnail) => (
            <CarouselThumbnail
              key={thumbnail}
              selected={thumbnail === selectedThumbnail}
              imageUrl={thumbnail}
              onClick={() => handleThumbnail(thumbnail)}
            />
          ))}
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
