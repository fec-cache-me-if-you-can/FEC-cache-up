const outfitInit = (req, res, next) => {
  if (!req.session.outfit) {
    req.session.outfit = {};
  }
  next();
};

module.exports = outfitInit;
