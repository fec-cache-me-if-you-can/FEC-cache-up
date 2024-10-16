export const calculateAverageRating = (ratings) => {
  const totalVotes = Object.values(ratings).reduce(
    (sum, count) => sum + Number(count),
    0,
  );
  const weightedSum = Object.entries(ratings).reduce(
    (sum, [rating, count]) => sum + Number(rating) * Number(count),
    0,
  );
  return totalVotes ? Math.round((weightedSum / totalVotes) * 100) / 100 : 0;
};

export function processProductData({ productInfo, styleInfo, reviewMeta }) {
  const { id, name, category } = productInfo;
  const { original_price: price, photos } = styleInfo.results[0];
  const imageUrl = photos[0].url;
  const rating = calculateAverageRating(reviewMeta.ratings);

  return {
    id,
    name,
    category,
    price,
    imageUrl,
    rating,
  };
}
