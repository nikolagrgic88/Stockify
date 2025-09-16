import { IUser } from "./../models/user";
import { NextFunction, Request, Response } from "express";
import PickingList from "../models/pickingList";
import Order, { IItemDetails, IOrder } from "../models/orders";
import Product, { IProduct } from "../models/product";
import mongoose from "mongoose";
import Location, { ILocation } from "../models/location";
import User from "../models/user";

export type ItemsInTheListProps = {
  orderId: string;
  itemId: mongoose.Types.ObjectId;
  item: IItemDetails;
  quantity: number;
  locations: { location: ILocation; quantityInLocation: number }[];
};
export const createSinglesPickingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      assignedTo,
      fromSection,
      toSection,
      dispatcher,
      fromDate,
      toDate,
      priority,
      notes,
      itemsInList,
    } = req.body;

    const status = assignedTo ? "assigned" : "unassigned";

    // Get location IDs for section range
    const fromCharCode = fromSection.charCodeAt(0);
    const toCharCode = toSection.charCodeAt(0);

    const allowedSections = [];
    for (let i = fromCharCode; i <= toCharCode; i++) {
      allowedSections.push(String.fromCharCode(i));
    }

    const matchingLocations = await Location.find({
      section: { $in: allowedSections },
    }).select("_id");

    const locationIds = matchingLocations.map((loc: ILocation) =>
      loc._id.toString()
    );

    //  Get product IDs that have locations in those locationIds
    const matchingProducts = await Product.find({
      "locations.locationId": { $in: locationIds },
    }).select("_id");

    const productIds = matchingProducts.map((p) => p._id.toString());

    // Query orders that have one item, and that item’s productId is in the matching list

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      res.status(400).json({
        success: false,
        message: "Invalid fromDate or toDate",
      });
      return;
    }
    const query: any = {
      "items.1": { $exists: false },
      "items.0.productId": { $in: productIds },
      orderStatus: "pending",
      dateCreated: {
        $gte: from,
        $lte: to,
      },
      dispatcher: dispatcher,
    };

    const orders = await Order.find(query).limit(itemsInList || 20);

    const listItems: ItemsInTheListProps[] = [];

    for (const order of orders) {
      const product = await Product.findById(order.items[0].productId);
      if (!product) continue;

      const validLocations = product.locations.filter((loc) =>
        locationIds.includes(loc.locationId.toString())
      );

      const locations = await Promise.all(
        validLocations.map(async (loc) => {
          const location = await Location.findById(loc.locationId);

          return location
            ? { location, quantityInLocation: loc.quantity }
            : null;
        })
      );

      listItems.push({
        orderId: order._id.toString(),
        itemId: product._id,
        item: {
          barcode: product.barcode,
          color: product.color,
          description: product.description,
          size: product.size,
          sku: product.sku,
          title: product.title,
        },
        quantity: order.items[0].quantity,
        locations: locations.filter(Boolean) as {
          location: ILocation;
          quantityInLocation: number;
        }[],
      });
    }

    const updatedOrders = await Order.updateMany(
      { _id: { $in: listItems.map((i) => i.orderId) } },
      { $set: { orderStatus: "actioned" } }
    );

    if (listItems.length === 0) {
      res.status(400).json({
        success: false,
        message: "No Available Orders!",
        details: "Unable to create a picking list!",
      });
      return;
    }
    const newPList = new PickingList({
      quantity: listItems.length,
      status,
      priority,
      notes,
      itemsInList: listItems.length,
      staff: assignedTo || "",
      listItems,
    });
    console.log(newPList);

    const newPickingList = await newPList.save();

    if (!newPickingList || updatedOrders.modifiedCount === 0) {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
        details: "Unable to create a picking list!",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Single-item picking list created",
      pickingList: newPickingList,
    });
  } catch (error) {
    next(error);
  }
};

export const createMultiPickingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    assignedTo,
    fromSection,
    toSection,
    dispatcher,
    fromDate,
    toDate,
    priority,
    notes,
    ordersInList,
  } = req.body;
  try {
    const status = assignedTo ? "assigned" : "unassigned";

    // Get location IDs for section range
    const fromCharCode = fromSection.charCodeAt(0);
    const toCharCode = toSection.charCodeAt(0);

    const allowedSections = [];
    for (let i = fromCharCode; i <= toCharCode; i++) {
      allowedSections.push(String.fromCharCode(i));
    }

    const matchingLocations = await Location.find({
      section: { $in: allowedSections },
    }).select("_id");

    const locationIds = matchingLocations.map((loc: ILocation) =>
      loc._id.toString()
    );
    const matchingProducts = await Product.find({
      "locations.locationId": { $in: locationIds },
    }).select("_id");

    const productIds = matchingProducts.map((p) => p._id.toString());

    // Query orders that have one item, and that item’s productId is in the matching list

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      res.status(400).json({
        success: false,
        message: "Invalid fromDate or toDate",
      });
      return;
    }
    const query: any = {
      "items.1": { $exists: true },
      items: {
        $elemMatch: {
          productId: { $in: productIds },
        },
      },
      orderStatus: "pending",
      dateCreated: {
        $gte: from,
        $lte: to,
      },
      dispatcher: dispatcher,
    };

    const orders = await Order.find(query).limit(ordersInList || 15);
    const listItems: ItemsInTheListProps[] = [];

    for (const order of orders) {
      await Promise.all(
        order.items.map(async (i) => {
          const product = await Product.findById(i.productId);
          if (!product) return;

          const validLocations = product.locations.filter((loc) =>
            locationIds.includes(loc.locationId.toString())
          );

          const locations = await Promise.all(
            validLocations.map(async (loc) => {
              const location = await Location.findById(loc.locationId);

              return location
                ? { location, quantityInLocation: loc.quantity }
                : null;
            })
          );

          listItems.push({
            orderId: order._id.toString(),
            itemId: product._id,
            item: {
              barcode: product.barcode,
              color: product.color,
              description: product.description,
              size: product.size,
              sku: product.sku,
              title: product.title,
            },
            quantity: i.quantity,
            locations: locations.filter(Boolean) as {
              location: ILocation;
              quantityInLocation: number;
            }[],
          });
        })
      );
    }

    const updatedOrders = await Order.updateMany(
      { _id: { $in: listItems.map((i) => i.orderId) } },
      { $set: { orderStatus: "actioned" } }
    );

    if (listItems.length === 0) {
      res.status(400).json({
        success: false,
        message: "No Available Orders!",
        details: "Unable to create a picking list!",
      });
      return;
    }
    const newPList = new PickingList({
      quantity: listItems.length,
      status,
      priority,
      notes,
      itemsInList: listItems.length,
      staff: assignedTo || "",
      listItems,
    });

    const newPickingList = await newPList.save();

    if (!newPickingList || updatedOrders.modifiedCount === 0) {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
        details: "Unable to create a picking list!",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Multi-item picking list created",
      pickingList: newPickingList,
    });
  } catch (error) {
    next(error);
  }
};

export const createCombinedPickingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //TODO fix assigned to speling
    const { asignTo, priority, notes, orders } = req.body;

    const status = asignTo ? "assigned" : "unassigned";
    const staff = asignTo && (await User.findById(asignTo).select("-password"));

    const itemsInTheOrder = await Promise.all<ItemsInTheListProps[]>(
      orders.map(async (orderId: string) => {
        const order = (await Order.findById(orderId)) as IOrder | null;
        if (!order) {
          throw new Error(`Order with ID ${orderId} not found`);
        }

        // List of items to add to the picking list
        const itemsInTheList = new Array<ItemsInTheListProps>();

        for (const i of order.items) {
          const item = (await Product.findById(i.productId)) as IProduct;

          if (!item) {
            throw new Error(`Product with ID ${i.productId} not found`);
          }

          if (!item.locations || item.locations.length === 0) {
            throw new Error(`Product ${item._id} has no available locations`);
          }

          const requestedQuantity = i.quantity;
          let qInOrder = 0;

          const locations: {
            location: ILocation;
            quantityInLocation: number;
          }[] = [];

          //finding locations with available quantity
          for (const loc of item.locations) {
            if (qInOrder >= requestedQuantity) break;

            const remainingQty = requestedQuantity - qInOrder;
            if (loc.reservableQuantity > 0) {
              const takeQty = Math.min(remainingQty, loc.quantity);

              const location = (await Location.findById(
                loc.locationId
              )) as ILocation;

              if (location) {
                locations.push({ location, quantityInLocation: takeQty });
                qInOrder += takeQty;

                const productToUpdate = await Product.findById(item._id);
                if (productToUpdate) {
                  const locationToUpdate = productToUpdate.locations.find(
                    (l) => l.locationId.toString() === loc.locationId.toString()
                  );
                  if (locationToUpdate) {
                    locationToUpdate.reservableQuantity -= takeQty;
                    await productToUpdate.save();
                  }
                }
              }
            }
          }

          if (qInOrder < requestedQuantity) {
            throw new Error(
              `Not enough quantity available for product ${item._id}`
            );
          }

          itemsInTheList.push({
            orderId: orderId,
            itemId: item._id,
            item: {
              barcode: item.barcode,
              color: item.color,
              description: item.description,
              size: item.size,
              sku: item.sku,
              title: item.title,
            },
            quantity: qInOrder,
            locations: locations,
          });
        }
        console.log();

        return itemsInTheList;
      })
    );

    if (itemsInTheOrder.length === 0) {
      res.status(400).json({
        success: false,
        message: "No Available Orders!",
        details: "Unable to create a picking list!",
      });
      return;
    }

    const newPList = new PickingList({
      quantity: itemsInTheOrder
        .flat()
        .reduce(
          (accumulator, currentItem) => accumulator + currentItem.quantity,
          0
        ),
      status,
      notes,
      priority,
      listItems: itemsInTheOrder.flat(),
      ...(asignTo && { staff }),
    });

    const newPickingList = await newPList.save();

    if (!newPickingList) {
      throw new Error("Failed to create the picking list");
    }
    await Order.updateMany(
      { _id: { $in: orders } },
      { $set: { orderStatus: "actioned" } }
    );

    res.status(200).json({
      success: true,
      message: "Picking list successfully created",
      pickingList: newPickingList,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPickingLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lists = await PickingList.find()
      .populate(
        "staff",
        "-password -__v -auth -createdAt -updates -phoneNumber -updatedAt"
      )
      .populate("listItems.locations.location");

    if (!lists) {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
        details: "Unable to create a find picking list!",
      });
    }
    res.status(201).json({
      success: true,
      message: "Single-item picking list created",
      pickingList: lists,
    });
  } catch (error) {
    next(error);
  }
};
