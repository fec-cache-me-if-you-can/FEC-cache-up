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

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setSlogan(product.slogan);
      setDescription(product.description);
    }
  }, [product]);

  useEffect(() => {
    axios.get(`products/${product.id}/styles`).then((response) => {
      setStyleOptions(response.data.results);
      setSelectedStyle(response.data.results[0]);
      setSelectedStyleId(response.data.results[0].style_id);
    });
  }, [product.id]);

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
      ([sku, details]) => details.size === size, // eslint-disable-line no-unused-vars
    );

    if (selectedSku) {
      setSelectedSkuId(selectedSku[0]);
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
        .then(() => {
          console.log('Item successfully added to cart!');
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
        });
    }
  };

  return (
    <div className="container-fluid px-3 p-md-0">
      <div className="row g-5">
        <div className="col-12 col-xl-7">
          <ImageGallery photos={photos} />
        </div>

        <div className="col-12 col-xl-5">
          <div className="d-flex flex-column gap-4 h-100">
            <div className="mb-auto">
              {' '}
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
            </div>

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
      </div>

      <div className="row mt-5">
        <div className="col-12 ps-0 pe-0">
          <AdditionalInfo
            slogan={slogan || ''}
            description={description || ''}
          />
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
