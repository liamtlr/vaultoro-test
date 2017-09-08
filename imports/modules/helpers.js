function getStarRating(rating){
  remainder = (5 - rating)
  return "★".repeat(rating) + "☆".repeat(remainder)
}

export { getStarRating }
