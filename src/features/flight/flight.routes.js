import { Router } from "express";
import FlightController from "./flight.controller.js";
import { protectSensitive } from "../../middlewares/jwtAuth.js";
import multerStorage from "../../middlewares/multer.js";
const flightController = new FlightController();
const flightRoutes = Router();

//form for create a newflight

//create a new flight. Only a admin can create.
flightRoutes.post(
  "/",
  (req, res, next) => {
    console.log("gg");
    next();
  },
  protectSensitive,
  multerStorage.single("flightImage"),
  (req, res, next) => {
    console.log(req.body);
    flightController.createFlight(req, res, next);
  }
);

//search query
flightRoutes.get("/", protectSensitive, (req, res, next) => {
  flightController.searchFlights(req, res, next);
});

//get a particular flight
flightRoutes.get("/:_id", (req, res, next) => {
  flightController.getFlightInfo(req, res, next);
});

//update a particular flight. Only a admin who created it can do.
flightRoutes.put("/:_id", (req, res, next) => {
  flightController.updateFlight(req, res, next);
});
//delete a particular flight. Only a admin who created it can do.
flightRoutes.delete("/:_id", (req, res, next) => {
  flightController.deleteFlight(req, res, next);
});
export default flightRoutes;
