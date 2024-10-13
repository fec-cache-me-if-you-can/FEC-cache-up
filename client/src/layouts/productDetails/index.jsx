import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductInformation from './features/ProductInformation.jsx';
import ImageGallery from './features/ImageGallery.jsx';
import AdditionalInfo from './features/AdditionalInfo.jsx';
import AddToCart from './features/AddToCart.jsx';
import StyleSelector from './features/StyleSelector.jsx';
import PropTypes from 'prop-types';

export default function ProductDetails({ product }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState('');
  const [slogan, setSlogan] = useState(product.slogan);
  const [description, setDescription] = useState(product.description);
  const [rating, setRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styleOptions, setStyleOptions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [photos, setPhotos] = useState([]);

  //pull info on styles
  useEffect(() => {
    axios.get(`products/${product.id}/styles`).then((response) => {
      console.log('response with styles: ', response);
      setStyleOptions(response.data.results);
      setSelectedStyle(response.data.results[0]);
    });
  }, [product.id]);

  //pull info on reviews
  useEffect(() => {
    axios.get(`reviews/meta?product_id=${product.id}`).then((response) => {
      const totalReviews = Object.values(response.data.ratings).reduce(
        (sum, count) => sum + parseInt(count, 10),
        0,
      );
      const averageScore =
        Object.entries(response.data.ratings).reduce((sum, [rating, count]) => {
          return sum + rating * count;
        }, 0) / totalReviews;
      setRating(averageScore);
      setNumberOfRatings(totalReviews);
    });
  }, [product.id]);

  //update sizes:
  useEffect(() => {
    if (selectedStyle) {
      const sizesArray = Object.values(selectedStyle.skus).map(
        (sku) => sku.size,
      );
      setSizes(sizesArray);
      setPrice(selectedStyle.original_price);
      setPhotos(selectedStyle.photos);
    }
  }, [selectedStyle]);

  //update quantities:
  useEffect(() => {
    if (selectedSize && selectedStyle) {
      const skuForSelectedSize = Object.values(selectedStyle.skus).find(
        (sku) => sku.size === selectedSize,
      );
      if (skuForSelectedSize) {
        const maxQuantity = skuForSelectedSize.quantity;
        const quantitiesArray = Array.from(
          { length: Math.min(maxQuantity, 15) },
          (_, i) => i + 1,
        );
        setQuantity(quantitiesArray);
        setSelectedQuantity(null);
      } else {
        setQuantity([]);
      }
    }
  }, [selectedSize, selectedStyle]);

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setSelectedSize('');
    setSelectedQuantity(null);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(null);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  return (
    <div>
      <div>Product Details</div>

      <ImageGallery photos={photos} />

      <AdditionalInfo slogan={slogan || ''} description={description || ''} />

      <ProductInformation
        name={name}
        category={category}
        price={price}
        rating={rating}
        numberOfRatings={numberOfRatings}
      />

      <StyleSelector
        selectedStyle={selectedStyle}
        styleOptions={styleOptions}
        onChange={handleStyleChange}
      />

      <AddToCart
        selectedStyle={selectedStyle}
        sizes={sizes}
        selectedSize={selectedSize}
        quantity={quantity}
        selectedQuantity={selectedQuantity}
        onSizeChange={handleSizeChange}
        onQuanChange={handleQuantityChange}
      />
    </div>
  );
}

ProductDetails.propTypes = { product: PropTypes.object.isRequired };
