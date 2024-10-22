import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Placeholder from '../Placeholder';

describe('Placeholder Component', () => {
  test('renders correct structure with proper classes', () => {
    render(<Placeholder />);

    const mainDiv = screen.getByTestId('placeholder-container');
    expect(mainDiv).toHaveClass('placeholder-glow');

    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs).toHaveLength(3);

    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toBeInTheDocument();

    expect(paragraphs[0]).toHaveClass('placeholder', 'col-6');
    expect(heading).toHaveClass('placeholder', 'col-8');
    expect(paragraphs[1]).toHaveClass('placeholder', 'col-4');
    expect(paragraphs[2]).toHaveClass('placeholder', 'col-5');
  });

  test('placeholders contain no text content', () => {
    render(<Placeholder />);

    const placeholderElements = [
      ...screen.getAllByRole('paragraph'),
      screen.getByRole('heading', { level: 5 }),
    ];

    placeholderElements.forEach((placeholder) => {
      expect(placeholder).toHaveTextContent('');
    });
  });
});
