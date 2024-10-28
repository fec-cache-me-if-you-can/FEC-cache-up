import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownSelector from '@/components/DropdownSelector.jsx';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('DropdownSelector Component', () => {
  const mockOptions = ['XS', 'S', 'M'];

  test('renders without crashing', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        placeholder="Select Size"
        isDisabled={false}
        onChange={() => {}}
      />,
    );
    const dropdown = screen.getByText('Select Size');
    expect(dropdown).not.toBeNull();
  });

  // test('displays available sizes from options', () => {
  //   render(
  //     <DropdownSelector
  //       options={mockOptions}
  //       placeholder="Select Size"
  //       isDisabled={false}
  //       onChange={() => {}}
  //     />,
  //   );
  //   const options = screen.getAllByRole('option');
  //   expect(options.length).toBe(4);
  //   expect(screen.getByText('S')).not.toBeNull();
  //   expect(screen.getByText('M')).not.toBeNull();
  //   expect(screen.getByText('L')).not.toBeNull();
  // });

  // test('calls onChange with correct value when a size is selected', () => {
  //   const mockOnChange = jest.fn();
  //   render(
  //     <DropdownSelector
  //       options={mockOptions}
  //       placeholder="Select Size"
  //       isDisabled={false}
  //       onChange={mockOnChange}
  //     />,
  //   );

  //   fireEvent.change(screen.getByRole('combobox'), { target: { value: 'M' } });
  //   expect(mockOnChange).toHaveBeenCalledWith('M');
  // });

  // test('disables the dropdown when no sizes are available', () => {
  //   render(
  //     <DropdownSelector
  //       options={[]}
  //       placeholder="Select Size"
  //       isDisabled={false}
  //       onChange={() => {}}
  //     />,
  //   );

  //   const dropdown = screen.getByRole('combobox');
  //   expect(dropdown.hasAttribute('disabled')).toBe(true);
  //   expect(screen.getByText('OUT OF STOCK')).not.toBeNull();
  // });
});
