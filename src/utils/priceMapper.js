const mapCustomerPriceToYelp = (price) => {
  if (price >= 10 && price <= 100) return "1"; // Inexpensive
  if (price > 100 && price <= 300) return "2"; // Moderate
  if (price > 300 && price <= 1000) return "3"; // Expensive
  if (price > 1000 && price <= 10000) return "4"; // Very Expensive
  return "1,2,3,4"; // Default: include all price levels if out of range
};

const mapYelpPriceToRange = (priceLevel) => {
  const priceMap = {
      1: "$10 - $100",
      2: "$100 - $300",
      3: "$300 - $1000",
      4: "$1000 - $10000"
  };
  return priceMap[priceLevel] || "Unknown Price Range";
};

const mapCustomerPriceToGoogle = (price) => {
    if (price >= 10 && price <= 100) return { min: 0, max: 1 }; // Inexpensive
    if (price > 100 && price <= 300) return { min: 1, max: 2 }; // Moderate
    if (price > 300 && price <= 1000) return { min: 2, max: 3 }; // Expensive
    if (price > 1000 && price <= 10000) return { min: 3, max: 4 }; // Very Expensive
    return { min: 0, max: 4 }; // Default: include all price levels
};

const mapGooglePriceToRange = (priceLevel) => {
    const priceMap = {
        0: "Free or Not Available",
        1: "$10 - $100",
        2: "$100 - $300",
        3: "$300 - $1000",
        4: "$1000 - $10000"
    };
    return priceMap[priceLevel] || "Unknown Price Range";
};

module.exports = {
    mapCustomerPriceToYelp,
    mapYelpPriceToRange,
    mapCustomerPriceToGoogle,
    mapGooglePriceToRange
};