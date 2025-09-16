import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import Location from "../models/location";
import Order from "../models/orders";
import PickingList from "../models/pickingList";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productCount = await Product.countDocuments();

    const locationCount = await Location.countDocuments();

    const unusedLocationCount = await Location.countDocuments({
      products: { $exists: false },
    });

    const pendingOrderCount = await Order.countDocuments({
      orderStatus: "pending",
    });
    const actionedOrders = await Order.countDocuments({
      orderStatus: "actioned",
    });
    const pickingListPerUser = await PickingList.aggregate([
      {
        $match: { status: "assigned" },
      },
      {
        $group: {
          _id: "$staff",
          pickingQuantity: { $sum: { $size: "$listItems" } },
        },
      },
    ]);

    const emptyLocationsPerAisle = await Location.aggregate([
      {
        $match: { products: { $size: 0 } },
      },
      {
        $group: {
          _id: "$section",
          emptyCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          section: "$_id",
          emptyCount: 1,
        },
      },
    ]);
    await PickingList.populate(pickingListPerUser, {
      path: "_id",
      select: [, "firstName", "lastName"],
      model: "User",
    });
    const usedLocationsPerAisle = await Location.aggregate([
      {
        $match: { products: { $gt: { $size: 0 } } },
      },
      {
        $group: {
          _id: "$section",
          usedCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          section: "$_id",
          usedCount: 1,
        },
      },
    ]);

    res.status(200).json({
      productCount: productCount,
      locationCount: locationCount,
      unusedLocationCount: unusedLocationCount,
      pendingOrderCount: pendingOrderCount,
      emptyLocationsPerAisle: emptyLocationsPerAisle,
      usedLocationsPerAisle: usedLocationsPerAisle,
      actionedOrders: actionedOrders,
      pickingItemsPerUser: pickingListPerUser,
    });
  } catch (error) {
    next(error);
  }
};
