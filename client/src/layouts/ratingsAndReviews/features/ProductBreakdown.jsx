import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Scale from '../../../components/Scale.jsx';

export default function ProductBreakdown({ metaReviews }) {
  const [characteristics, setCharacteristics] = useState(null);
  useEffect(() => {
    if (metaReviews?.characteristics) {
      setCharacteristics(metaReviews.characteristics);
    }
  }, [metaReviews]);

  if (!characteristics) {
    return <div>Loading product breakdown...</div>;
  }

  return (
    <div className="product-breakdown">
      {characteristics.Size && (
        <Scale
          name="Size"
          averageValue={Number(characteristics.Size.value)}
          lowPoint="Too Small"
          highPoint="Too Big"
          midPoint="Perfect"
        />
      )}

      {characteristics.Width && (
        <Scale
          name="Width"
          averageValue={Number(characteristics.Width.value)}
          lowPoint="Too Narrow"
          highPoint="Too Wide"
          midPoint="Perfect"
        />
      )}

      {characteristics.Comfort && (
        <Scale
          name="Comfort"
          averageValue={Number(characteristics.Comfort.value)}
          lowPoint="Uncomfortable"
          highPoint="Perfect"
        />
      )}

      {characteristics.Quality && (
        <Scale
          name="Quality"
          averageValue={Number(characteristics.Quality.value)}
          lowPoint="Poor"
          highPoint="Perfect"
          midPoint="Average"
        />
      )}

      {characteristics.Length && (
        <Scale
          name="Length"
          averageValue={Number(characteristics.Length.value)}
          lowPoint="Too Short"
          highPoint="Too Long"
          midPoint="Perfect"
        />
      )}

      {characteristics.Fit && (
        <Scale
          name="Fit"
          averageValue={Number(characteristics.Fit.value)}
          lowPoint="Not a good fit"
          highPoint="Perfect"
        />
      )}
    </div>
  );
}

ProductBreakdown.propTypes = {
  metaReviews: PropTypes.object.isRequired,
};
