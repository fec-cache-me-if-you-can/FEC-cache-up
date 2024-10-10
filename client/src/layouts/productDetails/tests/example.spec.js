import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownSelector from '../../../components/DropdownSelector';


describe('DropdownSelector Component', () => {

  const mockOptions = [
    { size: 'S', skuId: 1 },
    { size: 'M', skuId: 2 },
    { size: 'L', skuId: 3 }
  ];

  test('renders without crashing', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        defaultText="Select Size"
        isDisabled={false}
        onChange={() => {}}
      />
    );
    const dropdown = screen.getByText('Select Size');
    expect(dropdown).not.toBeNull();
  });

  test('displays available sizes from options', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        defaultText="Select Size"
        isDisabled={false}
        onChange={() => {}}
      />
    );
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(4);
    expect(screen.getByText('S')).not.toBeNull();
    expect(screen.getByText('M')).not.toBeNull();
    expect(screen.getByText('L')).not.toBeNull();
  });

  test('calls onChange with correct value when a size is selected', () => {
    const mockOnChange = jest.fn();
    render(
      <DropdownSelector
        options={mockOptions}
        defaultText="Select Size"
        isDisabled={false}
        onChange={mockOnChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'M' } });
    expect(mockOnChange).toHaveBeenCalledWith('M');
  });

  test('disables the dropdown when no sizes are available', () => {
    render(
      <DropdownSelector
        options={[]}
        defaultText="Select Size"
        isDisabled={false}
        onChange={() => {}}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown.hasAttribute('disabled')).toBe(true);
    expect(screen.getByText('OUT OF STOCK')).not.toBeNull();
  });
});