const addProductToSessionOutfit = (request, response) => {
  try {
    const { body: productData } = request;
    const { id: productId } = productData;

    if (!productId) {
      return response.status(400).json({ error: 'Invalid product ID' });
    }

    if (productExistsInSession(request, productId)) {
      return response.status(409).json({ error: 'Product already exists' });
    }

    request.session.outfit[productId] = productData;
    response.status(201).json(Object.values(request.session.outfit));
  } catch (error) {
    console.error('Error adding product:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeProductFromSessionOutfit = (request, response) => {
  try {
    const { id: productId } = request.params;

    if (!productId || !productExistsInSession(request, productId)) {
      return response.status(404).json({ error: 'Product not found' });
    }

    delete request.session.outfit[productId];
    response.status(200).json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error removing product:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSessionOutfit = (request, response) => {
  try {
    response.status(200).json(Object.values(request.session.outfit));
  } catch (error) {
    console.error('Error retrieving outfit:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

const productExistsInSession = (request, productId) =>
  !!request.session.outfit?.[productId];

module.exports = {
  addProductToSessionOutfit,
  removeProductFromSessionOutfit,
  getSessionOutfit,
};
