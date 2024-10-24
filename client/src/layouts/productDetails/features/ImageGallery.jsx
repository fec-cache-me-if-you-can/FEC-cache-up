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
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    console.debug('Image Clicked');
  };

  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
    if (!expandedView) {
      document.body.classList.add('expanded-view-active');
    } else {
      document.body.classList.remove('expanded-view-active');
    }
    console.debug('Expanded View Toggled');
  };

  const toggleZoomView = () => {
    setZoom(!zoom);
  };

  const handleMouseMove = (e) => {
    if (!zoom) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const smoothingFactor = 0.5;
    setMousePosition({
      x: (x - 50) * smoothingFactor + 50,
      y: (y - 50) * smoothingFactor + 50,
    });
  };

  const getTransformStyle = () => {
    if (!zoom || !mousePosition) return {};
    const { x, y } = mousePosition;
    return {
      transform: `scale(2.5) translate(${-(x - 50)}%, ${-(y - 50)}%)`,
    };
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
    <div>
      {/* Expanded View Content */}
      {expandedView && (
        <div className="gallery-expanded-overlay">
          {/* Thumbnails/Icons for Expanded View */}
          {!zoom && (
            <div className="gallery-expanded-thumbnails">
              {thumbnails.map((thumbnail, i) => (
                <div
                  key={thumbnail}
                  className="gallery-icon-wrapper"
                  onClick={() => handleThumbnail(thumbnail)}
                  style={{
                    color: thumbnail === selectedThumbnail ? 'white' : 'grey', // Conditionally apply color
                    fontSize: '24px',
                    transition: 'color 0.3s',
                    cursor: 'pointer',
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleThumbnail(thumbnail);
                    }
                  }}
                >
                  <Icon
                    icon={
                      thumbnail === selectedThumbnail
                        ? 'fa-solid fa-circle-dot'
                        : 'fa-solid fa-circle'
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <div className="gallery-expanded-main">
            {/* Navigation */}
            {!zoom && (
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
            )}

            {/* Expand Image */}

            <img
              src={imageGallery[index]}
              onClick={toggleZoomView}
              onMouseMove={handleMouseMove}
              className={`gallery-expanded-image ${zoom ? 'zoomed' : ''}`}
              style={zoom ? getTransformStyle() : {}}
            />
            {/* Expand Icon */}
            <div>
              <Icon icon="fa-regular fa-expand" />
            </div>

            {/* Expand Icon */}
            <div
              className="gallery-expand-icon"
              onClick={toggleExpandedView}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleExpandedView();
                }
              }}
            >
              <Icon icon="fa-regular fa-compress" />
            </div>
          </div>
        </div>
      )}

      {/* Defualt View */}
      <div className="gallery-container">
        {/* Thumbnails Column */}
        {!isMobile && (
          <div className="gallery-thumbnails-column">
            {/* Up Arrow */}
            {!visibleThumbnails.includes(thumbnails[0]) && (
              <div
                onClick={scrollThumbnailsUp}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    scrollThumbnailsUp();
                  }
                }}
              >
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
              <div
                onClick={scrollThumbnailsDown}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    scrollThumbnailsDown();
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <Icon icon="fa-chevron-down" />
              </div>
            )}
          </div>
        )}

        {/* Main Image Carousel */}
        <div className="position-relative w-100">
          {/* Carousel Image Container */}
          <div className="position-relative" style={{ paddingBottom: '100%' }}>
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              onClick={handleImageClick}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleImageClick();
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'zoom-in' }}
            >
              <img
                src={imageGallery[index]}
                alt={`Slide ${index}`}
                className="w-100 h-100 object-fit-cover"
              />
              {/* Expand Icon */}
              <div
                className="position-absolute top-0 end-0 p-3 bg-dark bg-opacity-50 m-2 rounded-1 text-white"
                onClick={toggleExpandedView}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleExpandedView();
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <Icon icon="fa-regular fa-expand" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div
            className="position-absolute top-0 bottom-0 start-0 end-0"
            style={{ pointerEvents: 'none' }}
          >
            {/* Previous Button - Always on left */}
            <div
              className="position-absolute top-50 translate-middle-y start-0"
              style={{ pointerEvents: 'auto' }}
            >
              {index > 0 && (
                <div className="bg-dark bg-opacity-25 rounded-end d-flex align-items-center">
                  <button
                    onClick={handlePrevImage}
                    className="btn border-0 text-white px-3 py-4"
                    aria-label="Previous image"
                  >
                    <Icon icon="fa-chevron-left" />
                  </button>
                </div>
              )}
            </div>

            {/* Next Button - Always on right */}
            <div
              className="position-absolute top-50 translate-middle-y end-0"
              style={{ pointerEvents: 'auto' }}
            >
              {index < imageGallery.length - 1 && (
                <div className="bg-dark bg-opacity-25 rounded-start d-flex align-items-center">
                  <button
                    onClick={handleNextImage}
                    className="btn border-0 text-white px-3 py-4"
                    aria-label="Next image"
                  >
                    <Icon icon="fa-chevron-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ImageGallery.propTypes = { photos: PropTypes.array };
