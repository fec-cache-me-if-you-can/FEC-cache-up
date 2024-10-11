import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function StyleSelector({ productId = 40344 }) {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [styleOptions, setStyleOptions] = useState([]);

  useEffect(() => {
    axios.get(`/products/${productId}/styles`)
    .then((response) => {
      setStyleOptions(response.data.results)
      setSelectedStyle(response.data.results[0])
    });
    .catch((error) => {
      console.error('Error fetching product styles:', error);
    })
  });

  return (
    <div>
      <p>
        <strong>STYLE</strong> &gt; SELECTED STYLE{' '}
      </p>
    </div>
  );
}

StyleSelector.propTypes = { productId: PropTypes.number };
