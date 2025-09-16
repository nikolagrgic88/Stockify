import Product from "../models/product";
import Location, { ILocation } from "../models/location";

export const clearInventoryById = async (
  locationId: string
): Promise<ILocation | null> => {
  const location = await Location.findById(locationId);
  if (!location) return null;
  const productIds = location.products.map((prod) => prod.productId);
  if (productIds.length > 0) {
    const products = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
      const originalLocationEntry = product.locations.find(
        (entry) => entry.locationId.toString() === locationId
      );

      if (originalLocationEntry) {
        const { quantity } = originalLocationEntry;

        // Remove the location entry from the product
        product.locations = product.locations.filter(
          (entry) => entry.locationId.toString() !== locationId
        );

        // Reduce quantities 
        product.totalQuantity = Math.max(0, product.totalQuantity - quantity);
        product.availableQuantity = Math.max(0, product.availableQuantity - quantity);

        await product.save();
      }
    }

    
    location.products = [];
    await location.save();
  }
 
  return location;
};
