import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StyleThumbnail from '../../../components/StyleThumbnail.jsx';

export default function StyleSelector({ productId = 40344 }) {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [styleOptions, setStyleOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`/products/${productId}/styles`)
      .then((response) => {
        setStyleOptions(response.data.results);
        setSelectedStyle(response.data.results[0]);
      })
      .catch((error) => {
        console.error('Error fetching product styles:', error);
      });
  }, [productId]);

  const handleStyleClick = (style) => {
    setSelectedStyle(style);
  };

  return (
    <div>
      <p>
        <strong>STYLE</strong> &gt; {selectedStyle.name || 'SELECTED STYLE'}
      </p>

      <div className="style-thumbnails">
        {styleOptions.map((style) => (
          <StyleThumbnail
            key={style.style_id}
            url={style.photos[0].thumbnail_url}
            name={style.name}
            isSelected={style.style_id === selectedStyle.style_id}
            onClick={() => handleStyleClick(style)}
          />
        ))}
      </div>
    </div>
  );
}

StyleSelector.propTypes = { productId: PropTypes.number };
