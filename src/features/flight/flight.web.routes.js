import { Router } from "express";
import FlightController from "./flight.controller.js";
import { protectSensitive } from "../../middlewares/jwtAuth.js";
import validate_new_flight from "../../middlewares/data_validation/flights/newFlight.js";
import multerStorage from "../../middlewares/multer.js";
const FlightWebRoutes = Router();
const flightController = new FlightController();
FlightWebRoutes.post(
  "/",
  (req, res, next) => {
    console.log("hh");
    next();
  },
  protectSensitive,
  multerStorage.single("flightImage"),
  validate_new_flight,
  (req, res, next) => {
    flightController.createFlight(req, res, next);
  }
);
export default FlightWebRoutes;
