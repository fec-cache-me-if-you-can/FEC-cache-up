import React from 'react';
import PropTypes from 'prop-types';

export default function Scale({
  name,
  averageValue,
  lowPoint,
  highPoint,
  midPoint,
}) {
  const markerPosition = (averageValue / 5) * 100;

  return (
    <div className="scale-bar-container" style={{ marginBottom: '20px' }}>
      <div className="scale-label">
        <p>
          <b>{name}</b>
        </p>
      </div>

      <div
        className="bar-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5px',
        }}
      >
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bar-segment"
            style={{
              flex: 1,
              height: '10px',
              backgroundColor: 'var(--secondary-bg)',
              position: 'relative',
            }}
          >
            {index === Math.floor(markerPosition / 33.33) && (
              <div
                className="marker"
                style={{
                  position: 'absolute',
                  left: `${markerPosition % 33.33}%`,
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '10px solid var(--attention)',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div
        className="scale-labels"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        <span>{lowPoint}</span>
        {midPoint && <span style={{ textAlign: 'center' }}>{midPoint}</span>}
        <span>{highPoint}</span>
      </div>
    </div>
  );
}

Scale.propTypes = {
  name: PropTypes.string,
  averageValue: PropTypes.number,
  lowPoint: PropTypes.string,
  highPoint: PropTypes.string,
  midPoint: PropTypes.string,
};
