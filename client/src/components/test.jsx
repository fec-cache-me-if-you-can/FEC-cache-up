import React from 'react';

import PrimaryButton from './PrimaryButton.jsx';
import DropdownSelector from './DropdownSelector.jsx';
import StarRating from './StarRating.jsx';
import CheckmarkNote from './CheckmarkNote.jsx';
import CarouselThumbnail from './CarouselThumbnail.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import FacebookIcon from './FacebookIcon.jsx';
import PinterestIcon from './PinterestIcon.jsx';
import XIcon from './XIcon.jsx';

export default function TestComponent() {
  return (
    <div className="container border-3 border-black">
      <LoadingSpinner size={'100px'} />
      <FacebookIcon size={'xl'} />
      <PinterestIcon size={'xl'} />
      <XIcon size={'xl'} />
    </div>
  );
}
