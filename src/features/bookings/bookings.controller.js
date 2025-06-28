import BookingRepository from "./booking.repository.js";

export default class BookingController {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }
  initializeNewBooking = async (req, res, next) => {
    try {
      const bookedBy = req.userData.userID;
      const response = await this.bookingRepository.initializeNewBookingRepo({
        ...req.body,
        bookedBy,
      });
      if (response.success) {
        if (req.requestType === "web") {
          return res.render("");
        }
        return res.status(201).send({
          success: true,
          message: "Booking Initialized",
          pnr: response.pnr_number,
        });
      }

      return res.status(response.error.statusCode).send(response.error.msg);
    } catch (error) {
      next(err);
    }
  };

  addPassenger = async (req, res, next) => {
    const passengerData = req.body;
    const response = await this.bookingRepository.addPassengerRepo(
      req.userData.userID,
      passengerData
    );

    if (response.success) {
      return res
        .status(201)
        .send({ success: true, message: "Passenger Added Successfully." });
    }
    return res.status(response.error.statusCode).send(response.error);
  };

  findTotalCost = async (req, res, next) => {
    const response = await this.bookingRepository.findTotalCostRepo(
      req.userData.userID,
      req.params._id
    );
    if (response.success) {
      return res
        .status(200)
        .send({ success: true, passengers: response.passengers });
    }

    return res.status(response.error.statusCode).send(response.error);
  };
  confirmPayment = async (req, res, next) => {
    const { amount } = req.body;
    if (!amount) return res.status(400).send("Please enter amount");
    const response = await this.bookingRepository.confirmPaymentRepo(
      req.userData.userID,
      req.params._id,
      amount
    );

    if (response.success) {
      return res.status(201).send(response.message);
    }

    return res.status(response.error.statusCode).send(response.error.msg);
  };
  getBookingInfo = async (req, res, next) => {
    const response = await this.bookingRepository.getBookingInfoForUser(
      req.userData.userID,
      req.params._id
    );
    if (response.success) {
      return res.status(200).send(response.booking);
    }
    return res.status(400).send("Couldn't find the booking");
  };

  //cancel booking and return refund

  cancelBooking = async (req, res, next) => {
    const response = await this.bookingRepository.cancelBookingRepo(
      req.userData.userID,
      req.params._id
    );

    if (response.success) {
      return res.status(200).send("Booking Cancelled");
    }
    return res.status(response.error.statusCode).send(response.error.msg);
  };
}
