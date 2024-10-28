import React from 'react';

import PropTypes from 'prop-types';
import StyleThumbnail from '@/components/StyleThumbnail.jsx';

export default function StyleSelector({
  selectedStyle,
  styleOptions,
  onChange,
}) {
  if (!selectedStyle || !styleOptions.length) {
    return <div>Loading styles...</div>;
  }
  return (
    <div className="my-3">
      <p className="">
        <span className="fw-bold">STYLE</span>
        <span className="px-2">&gt;</span>
        <span>{selectedStyle.name || 'SELECTED STYLE'}</span>
      </p>

      <div className="row g-4" style={{ maxWidth: '400px' }}>
        {styleOptions.map((style) => (
          <div className="col-3" key={style.style_id}>
            <div
              className="position-relative"
              style={{ paddingBottom: '100%' }}
            >
              <StyleThumbnail
                name={style.name}
                url={style.photos[0].thumbnail_url}
                isSelected={style.style_id === selectedStyle.style_id}
                onClick={() => onChange(style)}
              />
            </div>
          </div>
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
