import React from 'react';

import PrimaryButton from './PrimaryButton.jsx';
import DropdownSelector from './DropdownSelector.jsx';
import StarRating from './StarRating.jsx';
import CheckmarkNote from './CheckmarkNote.jsx';

export default function TestComponent() {
  return (
    <div className="container border-3 border-black">
      <CheckmarkNote label="This is a CheckmarkNote" />
      <PrimaryButton label="test" />
      <DropdownSelector options={['M', 'L', 'XS']} />
      <StarRating rating={2.5} />
    </div>
  );
}
