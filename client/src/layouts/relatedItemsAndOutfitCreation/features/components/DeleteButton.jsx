import React from 'react';
import Icon from '../../../../components/icons.jsx';
import PropTypes from 'prop-types';

export default function DeleteButton({ productId, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
      onDelete(productId);
    }, 300);
  };

  return (
    <button className="transparent-button trash-button" onClick={handleDelete}>
      <Icon icon={'fa-trash-alt fa-solid fa-lg'} />
    </button>
  );
}

DeleteButton.propTypes = {
  productId: PropTypes.number,
  onDelete: PropTypes.func,
};
