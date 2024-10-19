import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/icons.jsx';

const AddToOutfitCard = ({ productId, action }) => {
  const handleAddToOutfit = (e) => {
    e.preventDefault();
    action(productId);
  };

  return (
    <div
      className="card square border-1 fs-5 fw-normal me-4 cursor-pointer card-border d-flex justify-content-center align-items-center "
      style={{ width: '200px' }}
      role="button"
      tabIndex="0"
      onClick={handleAddToOutfit}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          action();
        }
      }}
    >
      <div className="hover-scale d-flex flex-column justify-content-center align-items-center">
        <Icon icon="fa-plus fa-solid" />
        <p className="m-0">Add to outfit</p>
      </div>
    </div>
  );
};

AddToOutfitCard.propTypes = {
  productId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default AddToOutfitCard;
