import React from 'react';

import PrimaryButton from './PrimaryButton.jsx';
import DropdownSelector from './DropdownSelector.jsx';
import RatingStars from './RatingStars.jsx';
import CheckmarkNote from './CheckmarkNote.jsx';

export default function TestComponent() {
  return (
    <div className="container border-3 border-black">
      <CheckmarkNote label="This is a CheckmarkNote" />
      <PrimaryButton label="test" />
      <DropdownSelector
        options={[
          { size: 'S', skuId: 1 },
          { size: 'M', skuId: 2 },
          { size: 'L', skuId: 3 },
          { size: 'XL', skuId: 4 },
        ]}
      />
      <RatingStars rating={2.5} />
    </div>
  );
}
