import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AbstractList from '../AbstractList';

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/scss/navigation', () => ({}));
jest.mock('swiper/react', () => ({
  // eslint-disable-next-line react/prop-types
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  // eslint-disable-next-line react/prop-types
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
}));
jest.mock('../components/AddToOutfitCard.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="add-to-outfit-card">Add to Outfit</div>,
}));
jest.mock('@/components/icons.jsx', () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="mock-icon">{icon}</span>,
}));

jest.mock('../components/AbstractProductCard.jsx', () => {
  // eslint-disable-next-line react/prop-types
  return function MockAbstractProductCard({ productId }) {
    return <div data-testid="abstract-product-card">{productId}</div>;
  };
});

describe('AbstractList Component', () => {
  const defaultProps = {
    items: ['1', '2', '3'],
    heading: 'Test Heading',
    CardComponent: jest.fn(({ productId }) => (
      <div data-testid="mock-card">{productId}</div>
    )),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner when products are loading', () => {
    render(<AbstractList {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders error message when error prop is provided', () => {
    const errorMessage = 'Test error';
    render(<AbstractList {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders no items message when items array is empty', () => {
    render(<AbstractList {...defaultProps} items={[]} />);
    expect(screen.getByTestId('no-items-message')).toBeInTheDocument();
  });

  test('renders Swiper carousel with correct number of slides', () => {
    render(<AbstractList {...defaultProps} />);
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(3);
  });

  test('renders navigation buttons when there are more than 3 items', () => {
    render(<AbstractList {...defaultProps} items={['1', '2', '3', '4']} />);
    expect(screen.getByLabelText('Scroll prev')).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll next')).toBeInTheDocument();
  });

  test('does not render navigation buttons when there are 3 or fewer items', () => {
    render(<AbstractList {...defaultProps} />);
    expect(screen.queryByLabelText('Scroll prev')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll next')).not.toBeInTheDocument();
  });

  test('renders AddToOutfitCard when isOutfit is true', () => {
    render(
      <AbstractList {...defaultProps} isOutfit={true} selectedProduct="1" />,
    );
    expect(screen.getByTestId('add-to-outfit-card')).toBeInTheDocument();
  });

  test('does not render AddToOutfitCard when isOutfit is false', () => {
    render(<AbstractList {...defaultProps} isOutfit={false} />);
    expect(screen.queryByTestId('add-to-outfit-card')).not.toBeInTheDocument();
  });

  test('renders correct heading', () => {
    render(<AbstractList {...defaultProps} />);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  test('renders CardComponent for each item', () => {
    render(<AbstractList {...defaultProps} />);
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveTextContent('1');
    expect(cards[1]).toHaveTextContent('2');
    expect(cards[2]).toHaveTextContent('3');
  });
});
