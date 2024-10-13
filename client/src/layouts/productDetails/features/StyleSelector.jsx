import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import StyleThumbnail from '../../../components/StyleThumbnail.jsx';

export default function StyleSelector({
  selectedStyle,
  styleOptions,
  onChange,
}) {
  if (!selectedStyle || !styleOptions.length) {
    return <div>Loading styles...</div>;
  }
  return (
    <div>
      <p>
        <strong>STYLE</strong> &gt; {selectedStyle.name || 'SELECTED STYLE'}
      </p>

      <div className="style-thumbnails">
        {styleOptions.map((style) => (
          <StyleThumbnail
            key={style.style_id}
            name={style.name}
            url={style.photos[0].thumbnail_url}
            isSelected={style.style_id === selectedStyle.style_id}
            onClick={() => onChange(style)}
          />
        ))}
      </div>
    </div>
  );
}

StyleSelector.propTypes = {
  selectedStyle: PropTypes.object,
  styleOptions: PropTypes.array,
  onChange: PropTypes.func,
};
