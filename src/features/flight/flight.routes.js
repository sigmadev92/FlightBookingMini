import { Router } from "express";
import FlightController from "./flight.controller.js";

const flightController = new FlightController();
const flightRoutes = Router();

flightRoutes.post("/", (req, res, next) => {
  flightController.createFlight(req, res, next);
});

flightRoutes.get("/", (req, res, next) => {
  flightController.searchFlights(req, res, next);
});

flightRoutes.get("/:_id", (req, res, next) => {
  flightController.getFlightInfo(req, res, next);
});

flightRoutes.put("/:_id", (req, res, next) => {
  flightController.updateFlight(req, res, next);
});

flightRoutes.delete("/:id", (req, res, next) => {
  flightController.deleteFlight(req, res, next);
});
export default flightRoutes;
