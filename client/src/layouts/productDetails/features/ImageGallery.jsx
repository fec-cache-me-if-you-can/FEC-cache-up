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
  const [expandedView, setExpandedView] = useState(false);

  const maxThumbnails = 5;

  useEffect(() => {
    const photosArray = photos.map((photo) => photo.url);
    const thumbnailArray = photos.map((photo) => photo.thumbnail_url);
    setImageGallery(photosArray);
    setSelectedImage(photosArray[0]);
    setThumbnails(thumbnailArray);
    setVisibleThumbnails(thumbnailArray.slice(0, maxThumbnails));
    setSelectedThumbnail(thumbnailArray[0]);
    setIndex(0);
  }, [photos]);

  const handleThumbnail = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    const i = thumbnails.indexOf(thumbnail);
    setIndex(i);
    setSelectedImage(imageGallery[i]);
  };

  const scrollThumbnailsUp = () => {
    const firstVisibleIndex = thumbnails.indexOf(visibleThumbnails[0]);
    if (firstVisibleIndex > 0) {
      const newStartIndex = Math.max(firstVisibleIndex - maxThumbnails, 0);
      setVisibleThumbnails(
        thumbnails.slice(newStartIndex, newStartIndex + maxThumbnails),
      );
    }
  };

  const scrollThumbnailsDown = () => {
    const lastVisibleIndex = thumbnails.indexOf(
      visibleThumbnails[visibleThumbnails.length - 1],
    );
    if (lastVisibleIndex < thumbnails.length - 1) {
      setVisibleThumbnails(
        thumbnails.slice(
          lastVisibleIndex + 1,
          lastVisibleIndex + 1 + maxThumbnails,
        ),
      );
    }
  };

  const handleNextImage = () => {
    const nextIndex = (index + 1) % imageGallery.length;
    setIndex(nextIndex);
    setSelectedImage(imageGallery[nextIndex]);
    setSelectedThumbnail(thumbnails[nextIndex]);

    const lastVisibleIndex = thumbnails.indexOf(
      visibleThumbnails[visibleThumbnails.length - 1],
    );
    if (nextIndex > lastVisibleIndex) {
      scrollThumbnailsDown();
    }
  };

  const handlePrevImage = () => {
    const prevIndex = (index - 1 + imageGallery.length) % imageGallery.length;
    setIndex(prevIndex);
    setSelectedImage(imageGallery[prevIndex]);
    setSelectedThumbnail(thumbnails[prevIndex]);

    const firstVisibleIndex = thumbnails.indexOf(visibleThumbnails[0]);
    if (prevIndex < firstVisibleIndex) {
      scrollThumbnailsUp();
    }
  };

  const handleImageClick = () => {
    setExpandedView(true);
  };

  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
    if (!expandedView) {
      document.body.classList.add('expanded-view-active');
    } else {
      document.body.classList.remove('expanded-view-active');
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
    <>
      {/* Expanded View Content */}
      {expandedView && (
        <div className="gallery-expanded-overlay">
          <div className="gallery-expanded-main">
            {/* Navigation */}
            <div className="gallery-carousel-controls">
              {index > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="gallery-carousel-btn gallery-prev"
                >
                  <Icon icon="fa-chevron-left" />
                </button>
              )}

              {index < imageGallery.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="gallery-carousel-btn gallery-next"
                >
                  <Icon icon="fa-chevron-right" />
                </button>
              )}
            </div>
            {/* Expand Image */}
            <img src={imageGallery[index]} className="gallery-expanded-image" />
            {/* Expand Icon */}
            <div className="gallery-expand-icon" onClick={toggleExpandedView}>
              <Icon icon="fa regular fa-compress" />
            </div>
          </div>
        </div>
      )}

      <div className="gallery-container">
        {/* Thumbnails Column */}
        <div className="gallery-thumbnails-column">
          {/* Up Arrow */}
          {!visibleThumbnails.includes(thumbnails[0]) && (
            <div onClick={scrollThumbnailsUp} style={{ cursor: 'pointer' }}>
              <Icon icon="fa-chevron-up" />
            </div>
          )}
          <div className="gallery-thumbnails" style={thumbnailGridStyle}>
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
          {!visibleThumbnails.includes(thumbnails[thumbnails.length - 1]) && (
            <div onClick={scrollThumbnailsDown} style={{ cursor: 'pointer' }}>
              <Icon icon="fa-chevron-down" />
            </div>
          )}
        </div>

        {/* Main Image Carousel */}
        <div className="gallery-carousel-container">
          {/* Carousel Image */}
          <div className="gallery-carousel-main" onClick={handleImageClick}>
            <img
              src={imageGallery[index]}
              alt={`Slide ${index}`}
              className="gallery-carousel-image"
            />
            {/* Expand Icon */}
            <div className="gallery-expand-icon" onClick={toggleExpandedView}>
              <Icon icon="fa regular fa-expand" />
            </div>
          </div>

          {/* Navigation */}
          <div className="gallery-carousel-controls">
            {index > 0 && (
              <button
                onClick={handlePrevImage}
                className="gallery-carousel-btn gallery-prev"
              >
                <Icon icon="fa-chevron-left" />
              </button>
            )}

            {index < imageGallery.length - 1 && (
              <button
                onClick={handleNextImage}
                className="gallery-carousel-btn gallery-next"
              >
                <Icon icon="fa-chevron-right" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ImageGallery.propTypes = { photos: PropTypes.array };
