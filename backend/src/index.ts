import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import csrf from "csurf";

import customerRoutes from "./routes/customerRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import movementRoutes from "./routes/movementRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import locationRoutes from "./routes/locationRoutes";
import authUserRoutes from "./routes/auth/authUserRoutes";
import authCompanyRoutes from "./routes/auth/authCompanyRoutes";
import errorHandler from "./middleware/errorHandler";
import pickingListRoutes from "./routes/pickingListRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// app.use(cors({ origin: FRONTEND_URL, credentials: true }));
const allowedOrigins = process.env.FRONTEND_URLS?.split(",") || [];

// index.ts

app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Allow requests with no origin (e.g., Postman, internal server tools)
      if (!origin) return callback(null, true);

      // 2. Check if the incoming origin is in the allowed list
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        // Reject the request
        return callback(new Error(msg));
      }

      return callback(null, true);
    },
   
    credentials: true,
  })
);

// const csrfProtection = csrf({ cookie: true });

// app.use(csrfProtection);

// Middleware to set CSRF token cookie
// app.use((req, res, next) => {
//   const csrfToken = req.csrfToken();
//   res.cookie("XSRF-TOKEN", csrfToken, {
//     httpOnly: false,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });
//   res.locals.csrfToken = csrfToken;
//   next();
// });

// app.all("*", (req, res, next) => {
//   console.log("Incoming Request Details:");
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   console.log("Cookies:", req.cookies);

//   try {
//     console.log("Client CSRF Token (Header):", req.headers["x-xsrf-token"]);
//     console.log("Client CSRF Token (Body):", req.body._csrf);
//   } catch (error) {
//     console.error("Error generating CSRF token on server:", error);
//   }
//   next();
// });

// Apply CSRF protection to all routes

app.use("/inventory", inventoryRoutes);

app.use("/movement", movementRoutes);
app.use("/orders", orderRoutes);
app.use("/picking-list", pickingListRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/location", locationRoutes);
app.use("/auth/user", authUserRoutes);
app.use("/auth/company", authCompanyRoutes);
app.use("/dashboard-stats", dashboardRoutes);

// Ensure errorHandler is included and placed correctly
app.use(errorHandler);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
  }
};

startServer();
