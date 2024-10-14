import React from 'react';

import PrimaryButton from './PrimaryButton.jsx';
import DropdownSelector from './DropdownSelector.jsx';
import StarRating from './StarRating.jsx';
import CheckmarkNote from './CheckmarkNote.jsx';
import CarouselThumbnail from './CarouselThumbnail.jsx';

export default function TestComponent() {
  return (
    <div className="container border-3 border-black">
      <div>unselected</div>
      <CarouselThumbnail
        imageUrl={
          'https://static.wikia.nocookie.net/dqw4w9wgxcq/images/0/08/Site-background-dark'
        }
        selected={false}
      />
      <div>selected</div>
      <CarouselThumbnail
        imageUrl={
          'https://static.wikia.nocookie.net/dqw4w9wgxcq/images/0/08/Site-background-dark'
        }
        selected={true}
      />
      <CheckmarkNote label="This is a CheckmarkNote" />
      <PrimaryButton label="test" />
      <DropdownSelector options={['M', 'L', 'XS']} />
      <StarRating rating={2.5} />
    </div>
  );
}
