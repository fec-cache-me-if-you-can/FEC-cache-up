import React from 'react';
import Icon from '@/components/icons.jsx';
import PropTypes from 'prop-types';

const DeleteButton = ({ productId, onDelete }) => {
  const handleDelete = ({ currentTarget }) => {
    currentTarget.classList.add('clicked');
    setTimeout(() => {
      currentTarget.classList.remove('clicked');
      if (typeof onDelete === 'function') {
        onDelete(productId);
      } else {
        console.error('onDelete is not a function');
      }
    }, 300);
  };

  return (
    <button
      className="transparent-button trash-button"
      onClick={handleDelete}
      aria-label="Delete item"
    >
      <Icon icon={`fa-trash fa-solid`} />
    </button>
  );
};

DeleteButton.propTypes = {
  productId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(DeleteButton);
