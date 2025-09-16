import { Request, Response, NextFunction } from "express";
import Location from "../models/location";
import Product from "../models/product";
import { clearInventoryById } from "../services/locationService";
import { createDbBarcode, generateBarcode } from "../services/barcodeServices";
import { createSortKey } from "../utils/createSortKey";

export const postCreateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Location.startSession();
  try {
    session.startTransaction();
    const {
      aisle,
      section,
      sectionNumber,
      column,
      row,
      remarks,
    }: {
      aisle: string;
      section: string;
      sectionNumber: number;
      column: string;
      row: number;
      remarks?: string;
    } = req.body;
    const location = await Location.findOne(
      {
        aisle,
        section,
        sectionNumber,
        column,
        row,
      },
      null,
      { session }
    );

    if (location) {
      res
        .status(409)
        .json({ message: "Location already exists!", location: location });
      return;
    }
    const sortKey = createSortKey({
      aisle,
      section,
      sectionNumber,
      column,
      row,
    });

    const locationsBefore = await Location.countDocuments({
      $expr: {
        $lt: [
          {
            $concat: [
              "$aisle",
              "-",
              "$section",
              "-",
              { $toString: "$sectionNumber" },
              "-",
              "$column",
              "-",
              { $toString: "$row" },
            ],
          },
          sortKey,
        ],
      },
    });
    const index = locationsBefore;

    const barcode = await generateBarcode();

    const newLocation = new Location({
      name: `${aisle}.${section}.${sectionNumber}.${column}.${row}`,
      aisle,
      section,
      sectionNumber,
      column,
      row,
      products: [],
      barcode,
      remarks: remarks || "",
      sortKey,
      index,
    });
    const saveLocation = await newLocation.save({ session });
    const savedBarcode = await createDbBarcode(barcode, "Location", session);

    if (!saveLocation || !savedBarcode) {
      res.status(400).json({
        message: "Something went wrog!",
        details: "The location coud not be saved!",
      });
      return;
    }
    await session.commitTransaction();
    res.status(201).json({
      message: "Location successfully created",
      location: newLocation,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

type LocationBodyProps = {
  aisle: string;
  section: string;
  sectionNumber: number;
  column: string;
  row: number;
  remarks?: string;
};
type LocationsBodyProp = LocationBodyProps[];

export const createManylocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Location.startSession();
  try {
    session.startTransaction();
    const locationsData: LocationsBodyProp = req.body;

    const createdLocations = [];
    for (const locationData of locationsData) {
      const {
        aisle,
        section,
        sectionNumber,
        column,
        row,
        remarks,
      }: LocationBodyProps = locationData;

      const existingLocation = await Location.findOne(
        {
          aisle,
          section,
          sectionNumber,
          column,
          row,
        },
        null,
        { session }
      );

      if (existingLocation) {
        res.status(409).json({
          message: "One or more locations already exist!",
          existingLocation,
        });
        await session.abortTransaction();
        return;
      }

      const sortKey = createSortKey({
        aisle,
        section,
        sectionNumber,
        column,
        row,
      });

      const locationsBefore = await Location.countDocuments({
        $expr: {
          $lt: [
            {
              $concat: [
                "$aisle",
                "-",
                "$section",
                "-",
                { $toString: "$sectionNumber" },
                "-",
                "$column",
                "-",
                { $toString: "$row" },
              ],
            },
            sortKey,
          ],
        },
      });
      const index = locationsBefore;

      const barcode = await generateBarcode();

      const newLocation = new Location({
        name: `${aisle}.${section}.${sectionNumber}.${column}.${row}`,
        aisle,
        section,
        sectionNumber,
        column,
        row,
        products: [],
        barcode,
        remarks: remarks || "",
        sortKey,
        index,
      });

      const saveLocation = await newLocation.save({ session });
      const savedBarcode = await createDbBarcode(barcode, "Location", session);

      if (!saveLocation || !savedBarcode) {
        res.status(400).json({
          message: "Something went wrong!",
          details: "One or more locations could not be saved!",
        });
        await session.abortTransaction();
        return;
      }

      createdLocations.push(newLocation);
    }

    await session.commitTransaction();
    res.status(201).json({
      message: "Locations successfully created",
      locations: createdLocations,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.locationId;

    const location = await clearInventoryById(locationId);
    if (!location) {
      res.status(404).json({ message: "Location doesn't exist!" });
      return;
    }
    console.log("LOCATION", location);

    const deleteLocation = await location.deleteOne();
    const deleteProductsInLocation = await Product.deleteMany({
      location: locationId,
    });

    if (!deleteLocation || !deleteProductsInLocation) {
      res.status(400).json({
        message: "Something went wrog!",
        details: "The location coud not be deleted!",
      });
      return;
    }

    res.status(200).json({
      message: "Location and associated products successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.locationId;
    const updatedData = req.body;

    const existing = await Location.findById(locationId);

    if (!existing) {
      res.status(404).json({ message: "Location not found!" });
      return;
    }

    const aisle = updatedData.aisle ?? existing.aisle;
    const section = updatedData.section ?? existing.section;
    const sectionNumber = updatedData.sectionNumber ?? existing.sectionNumber;
    const column = updatedData.column ?? existing.column;
    const row = updatedData.row ?? existing.row;

    updatedData.name = `${aisle}.${section}.${sectionNumber}.${column}.${row}`;

    updatedData.sortKey = createSortKey({
      aisle,
      section,
      sectionNumber,
      column,
      row,
    });

    const location = await Location.findByIdAndUpdate(locationId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!location) {
      res.status(404).json({ message: "Location not found!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Location Successfully Updated", location });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Location name must be unique!" });
    } else {
      next(error);
    }
  }
};

export const getAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await Location.find();
    if (!locations) {
      res.status(404).json({ message: "No locations found!" });
      return;
    }
    res
      .status(200)
      .json({ message: "Locations successfully found.", locations });
  } catch (error) {
    next(error);
  }
};

export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.locationId;
    const location = await Location.findById(locationId);
    if (!location) {
      res.status(404).json({ message: "No location found!" });
      return;
    }

    res.status(200).json({ message: "Location successfully found.", location });
  } catch (error) {
    next(error);
  }
};
