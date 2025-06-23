import { Router } from "express";
import BookingController from "./bookings.controller.js";
const bookingRoutes = Router();
const bookingController = new BookingController();
bookingRoutes.get("/", (req, res) => {
  res.send("/api/bookings/");
});

bookingRoutes.post("/", (req, res, next) => {
  bookingController.createNewBooking(req, res, next);
});

bookingRoutes.get("/:_id", (req, res, next) => {
  bookingController.getBookingInfo(req, res, next);
});

bookingRoutes.put("/:_id/cancel", (req, res, next) => {
  bookingController.cancelBooking(req, res, next);
});
export default bookingRoutes;
