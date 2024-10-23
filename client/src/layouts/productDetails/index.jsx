import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductInformation from './features/ProductInformation.jsx';
import ImageGallery from './features/ImageGallery.jsx';
import AdditionalInfo from './features/AdditionalInfo.jsx';
import AddToCart from './features/AddToCart.jsx';
import StyleSelector from './features/StyleSelector.jsx';
import PropTypes from 'prop-types';

export default function ProductDetails({ product, rating, numberOfRatings }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState(null);
  const [slogan, setSlogan] = useState(product.slogan);
  const [description, setDescription] = useState(product.description);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const [styleOptions, setStyleOptions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSkuId, setSelectedSkuId] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showSizeError, setShowSizeError] = useState(false);


  // Sync state with product prop when product changes
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setSlogan(product.slogan);
      setDescription(product.description);
      // Set other properties if needed, based on your product structure
    }
  }, [product]);

  //pull info on styles
  useEffect(() => {
    axios.get(`products/${product.id}/styles`).then((response) => {
      setStyleOptions(response.data.results);
      setSelectedStyle(response.data.results[0]);
      setSelectedStyleId(response.data.results[0].style_id);
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
      setSalePrice(selectedStyle.sale_price);
      setPhotos(selectedStyle.photos);
      setSelectedStyleId(selectedStyle.style_id);
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
        setSelectedQuantity(1);
        setShowSizeError(false);
      } else {
        setQuantity([]);
      }
    }
  }, [selectedSize, selectedStyle]);

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setSelectedSize('');
    setSelectedQuantity(null);
    setSelectedSkuId(null);
    setShowSizeError(false);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1);
    setShowSizeError(false);
    const selectedSku = Object.entries(selectedStyle.skus).find(
      ([sku, details]) => details.size === size,
    );

    if (selectedSku) {
      setSelectedSkuId(selectedSku[0]); // SKU ID is the key
    }
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
    } else {
      setShowSizeError(false);
      axios
        .post('/cart', { sku_id: selectedSkuId })
        .then((response) => {
          console.log('Item successfully added to cart!');
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
        });
    }
  };

  return (
    <div className="d-flex align-content-between">
      {/* Left Column: Image Gallery and Additional Info */}
      <div className="">
        <ImageGallery photos={photos} />
        <AdditionalInfo slogan={slogan || ''} description={description || ''} />
      </div>

      {/* Right Column: Product Info, Style Selector, and Add to Cart */}
      <div className="">
        <ProductInformation
          name={name}
          category={category}
          price={price}
          salePrice={salePrice}
          rating={rating}
          numberOfRatings={numberOfRatings}
        />
        <StyleSelector
          selectedStyle={selectedStyle}
          styleOptions={styleOptions}
          onChange={handleStyleChange}
        />
        <AddToCart
          productId={product.id}
          selectedStyleId={selectedStyleId}
          sizes={sizes}
          selectedSize={selectedSize}
          quantity={quantity}
          selectedQuantity={selectedQuantity}
          onSizeChange={handleSizeChange}
          onQuanChange={handleQuantityChange}
          showSizeError={showSizeError}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
