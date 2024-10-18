import React from 'react';
import PropTypes from 'prop-types';
import {
  getFeatureValue,
  createFeatureMap,
  getAllFeatureNames,
} from '../../utils';

const FeatureTable = ({ relatedProduct, selectedProduct }) => {
  const { name: relatedProductName, features: relatedFeatures } =
    relatedProduct;
  const { name: selectedProductName, features: selectedFeatures } =
    selectedProduct;

  if (!Array.isArray(relatedFeatures) || !Array.isArray(selectedFeatures)) {
    return <div>Invalid product features</div>;
  }

  const featureMapForRelatedProduct = createFeatureMap(relatedFeatures);
  const allFeatureNames = getAllFeatureNames(relatedFeatures, selectedFeatures);

  const renderFeatureRows = () =>
    Array.from(allFeatureNames).map((featureName) => (
      <tr key={featureName}>
        <td>{featureMapForRelatedProduct.get(featureName) || '-'}</td>
        <td className="fw-medium">{featureName}</td>
        <td>{getFeatureValue(selectedFeatures, featureName)}</td>
      </tr>
    ));

  return (
    <table className="table text-center">
      <thead>
        <tr className="fw-semibold">
          <th scope="col" className="column-style">
            {relatedProductName}
          </th>
          <th scope="col" className="column-style">
            Feature
          </th>
          <th scope="col" className="column-style">
            {selectedProductName}
          </th>
        </tr>
      </thead>
      <tbody>{renderFeatureRows()}</tbody>
    </table>
  );
};

FeatureTable.propTypes = {
  relatedProduct: PropTypes.shape({
    name: PropTypes.string,
    features: PropTypes.array,
  }),
  selectedProduct: PropTypes.shape({
    name: PropTypes.string,
    features: PropTypes.array,
  }),
};

export default FeatureTable;
