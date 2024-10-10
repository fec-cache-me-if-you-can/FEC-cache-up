import React from 'react';
import { useState } from 'react';

export default function PrimaryButton ({ label, onClick, isDisabled = false, className = ''}) {
  return (
    <button
      className={`button-component ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
