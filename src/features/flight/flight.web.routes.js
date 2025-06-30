import { Router } from "express";
import FlightController from "./flight.controller.js";
import { protectSensitive } from "../../middlewares/jwtAuth.js";
import validate_new_flight from "../../middlewares/data_validation/flights/newFlight.js";
import multerStorage from "../../middlewares/multer.js";
const FlightWebRoutes = Router();
const flightController = new FlightController();

FlightWebRoutes.get("/form", protectSensitive, (req, res) => {
  if (req.userData.role === "admin") res.render("newFlight");
  else res.render("home");
});
FlightWebRoutes.post(
  "/",
  (req, res, next) => {
    console.log("hh");
    next();
  },
  protectSensitive,
  (req, res, next) => {
    req.image_type = "flight-image";
    next();
  },
  multerStorage.single("flightImage"),
  validate_new_flight,
  (req, res, next) => {
    flightController.createFlight(req, res, next);
  }
);
export default FlightWebRoutes;
