export const calculateAverageRating = (ratings) => {
  const totalVotes = Object.values(ratings).reduce(
    (sum, count) => sum + Number(count),
    0,
  );
  const weightedSum = Object.entries(ratings).reduce(
    (sum, [rating, count]) => sum + Number(rating) * Number(count),
    0,
  );
  return totalVotes ? Math.round(weightedSum / totalVotes) : 0;
};
