import React from 'react';
import DropdownSelector from '../DropdownSelector';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DropdownSelector', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders with default placeholder', () => {
    render(<DropdownSelector options={mockOptions} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    expect(dropdownToggle).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        onChange={mockOnChange}
        placeholder="Choose an option"
      />,
    );
    const dropdownToggle = screen.getByRole('button', {
      name: 'Choose an option',
    });
    expect(dropdownToggle).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<DropdownSelector options={mockOptions} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(dropdownToggle);
    mockOptions.forEach((option) => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
  });

  test('calls onChange when an option is selected', () => {
    render(<DropdownSelector options={mockOptions} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(dropdownToggle);
    const option2 = screen.getByRole('button', { name: 'Option 2' });
    fireEvent.click(option2);
    expect(mockOnChange).toHaveBeenCalledWith('Option 2');
  });

  test('updates button text when an option is selected', () => {
    render(<DropdownSelector options={mockOptions} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(dropdownToggle);
    const option3 = screen.getByRole('button', { name: 'Option 3' });
    fireEvent.click(option3);
    expect(dropdownToggle).toHaveTextContent('Option 3');
  });

  test('disables button when isDisabled prop is true', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        onChange={mockOnChange}
        isDisabled={true}
      />,
    );
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    expect(dropdownToggle).toBeDisabled();
  });

  test('disables button when options array is empty', () => {
    render(<DropdownSelector options={[]} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    expect(dropdownToggle).toBeDisabled();
  });

  test('shows "OUT OF STOCK" when options array is empty', () => {
    render(<DropdownSelector options={[]} onChange={mockOnChange} />);
    const dropdownToggle = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(dropdownToggle);
    expect(screen.getByText('OUT OF STOCK')).toBeInTheDocument();
  });

  test('uses selectedOption prop when provided', () => {
    render(
      <DropdownSelector
        options={mockOptions}
        onChange={mockOnChange}
        selectedOption="Option 2"
      />,
    );
    const dropdownToggle = screen.getByText('Option 2', {
      selector: 'button.btn-primary',
    });
    expect(dropdownToggle).toHaveClass('dropdown-toggle');
  });

  test('updates when selectedOption prop changes', () => {
    const { rerender } = render(
      <DropdownSelector
        options={mockOptions}
        onChange={mockOnChange}
        selectedOption="Option 1"
      />,
    );
    let dropdownToggle = screen.getByText('Option 1', {
      selector: 'button.btn-primary',
    });
    expect(dropdownToggle).toHaveClass('dropdown-toggle');

    rerender(
      <DropdownSelector
        options={mockOptions}
        onChange={mockOnChange}
        selectedOption="Option 3"
      />,
    );
    dropdownToggle = screen.getByText('Option 3', {
      selector: 'button.btn-primary',
    });
    expect(dropdownToggle).toHaveClass('dropdown-toggle');
  });
});
