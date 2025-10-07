/**
 * Calculate the distance between two geographical coordinates using the Haversine formula
 * @param lat1 Latitude of first point in decimal degrees
 * @param lon1 Longitude of first point in decimal degrees
 * @param lat2 Latitude of second point in decimal degrees
 * @param lon2 Longitude of second point in decimal degrees
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // Radius of the earth in km
  const R = 6371;

  // Convert latitude and longitude from degrees to radians
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

/**
 * Convert degrees to radians
 * @param deg Angle in degrees
 * @returns Angle in radians
 */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Format distance in a user-friendly way
 * @param distance Distance in kilometers
 * @returns Formatted distance string
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  } else {
    return `${distance.toFixed(1)} km`;
  }
};

/**
 * Calculate match score between user interests
 * @param userInterests User's interests array
 * @param otherInterests Other person's interests array
 * @returns Match score as a percentage (0-100)
 */
export const calculateInterestMatch = (
  userInterests: string[],
  otherInterests: string[]
): number => {
  if (!userInterests.length || !otherInterests.length) return 0;

  // Find common interests
  const commonInterests = userInterests.filter(interest =>
    otherInterests.some(otherInterest => otherInterest.toLowerCase() === interest.toLowerCase())
  );

  // Calculate percentage match
  const matchPercentage = Math.round(
    (commonInterests.length / Math.max(userInterests.length, otherInterests.length)) * 100
  );

  return matchPercentage;
};

/**
 * Format match percentage in a user-friendly way
 * @param matchPercentage Match percentage (0-100)
 * @returns Formatted match string with emoji indicator
 */
export const formatMatchPercentage = (matchPercentage: number): string => {
  if (matchPercentage >= 75) {
    return `${matchPercentage}% match 🔥`; // High match
  } else if (matchPercentage >= 50) {
    return `${matchPercentage}% match ✨`; // Good match
  } else if (matchPercentage >= 25) {
    return `${matchPercentage}% match ⭐`; // Moderate match
  } else {
    return `${matchPercentage}% match`; // Low match
  }
};
