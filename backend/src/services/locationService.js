/**
 * Lightweight distance estimation using Haversine formula.
 */
const calculateDistanceKm = ({ pickupLat, pickupLng, dropLat, dropLng }) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(dropLat - pickupLat);
  const dLng = toRad(dropLng - pickupLng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(pickupLat)) * Math.cos(toRad(dropLat)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((earthRadiusKm * c).toFixed(2));
};

module.exports = { calculateDistanceKm };
