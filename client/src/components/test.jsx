import React from 'react';

import PrimaryButton from './PrimaryButton.jsx';
import DropdownSelector from './DropdownSelector.jsx';

export default function TestComponent() {
  return (
    <div className="container border-3 border-black">
      <PrimaryButton label="test" />
      <DropdownSelector
        options={[
          { size: 'S', skuId: 1 },
          { size: 'M', skuId: 2 },
          { size: 'L', skuId: 3 },
          { size: 'XL', skuId: 4 },
        ]}
      />
    </div>
  );
}
