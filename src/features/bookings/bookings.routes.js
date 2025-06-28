import { Router } from "express";
import BookingController from "./bookings.controller.js";
import { protectSensitive } from "../../middlewares/jwtAuth.js";
const bookingRoutes = Router();
const bookingController = new BookingController();
bookingRoutes.get("/", (req, res) => {
  res.send("/api/bookings/");
});
bookingRoutes.use(protectSensitive);
bookingRoutes.post("/", (req, res, next) => {
  bookingController.initializeNewBooking(req, res, next);
});
bookingRoutes.post("/add-passenger", (req, res, next) => {
  bookingController.addPassenger(req, res, next);
});

bookingRoutes.get("/:_id", (req, res, next) => {
  bookingController.getBookingInfo(req, res, next);
});
bookingRoutes.get("/:_id/totalCost", (req, res, next) => {
  bookingController.findTotalCost(req, res, next);
});

bookingRoutes.post("/:_id/confirm-payment", (req, res, next) => {
  bookingController.confirmPayment(req, res, next);
});

bookingRoutes.put("/:_id/cancel", (req, res, next) => {
  bookingController.cancelBooking(req, res, next);
});
export default bookingRoutes;
