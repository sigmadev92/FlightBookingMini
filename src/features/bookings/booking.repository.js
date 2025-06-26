import BookingModel from "./booking.schema.js";
import PassengerModel from "./passenger.schema.js";
export default class BookingRepository {
  async initializeNewBookingRepo(data) {
    //

    try {
      const newBooking = new BookingModel(data);
      newBooking.save();
      return {
        success: true,
        msg: "Booking Initialized. Add passengers and make payment due",
        pnr_number: newBooking._id,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: error.message,
        },
      };
    }
  }
  async addPassengerRepo(userId, _passengerData) {
    try {
      const booking = await BookingModel.findOne({
        _id: _passengerData.pnr_number,
        bookedBy: userId,
      });
      if (!booking) {
        return {
          success: false,
          error: {
            statusCode: 400,
            msg: "No previous bookings / Check Your PNR number",
          },
        };
      }
      const newPassenger = new PassengerModel(_passengerData);
      await newPassenger.save();

      booking.passengers.push(newPassenger._id);
      booking.save();
      return {
        success: true,
        message: "Passenger added successfully",
        data: {
          name: newPassenger.name,
          _id: newPassenger._id,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: error.message,
        },
      };
    }
  }
  async findTotalCostRepo(userId, _pnr) {
    const booking = await BookingModel.findOne({ _id: _pnr, bookedBy: userId });
    if (!booking) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "No previous bookings / Check Your PNR number",
        },
      };
    }
    const passengers = await booking.populate("passengers");
    booking.totalAmount = passengers.passengers
      .map((p) => p.price)
      .reduce((acc, price) => acc + price, 0);
    await booking.save();
    return {
      success: true,
      passengers,
    };
  }

  async confirmPaymentRepo(userId, _pnr, amount) {
    const booking = await BookingModel.findOne({ _id: _pnr, bookedBy: userId });
    if (!booking) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "No previous bookings / Check Your PNR number",
        },
      };
    }

    if (booking.paymentStatus === "paid") {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Payment already Done",
        },
      };
    }
    if (
      booking.paymentStatus === "Refunded" &&
      booking.bookingStatus === "Cancelled"
    ) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "This booking was already cancelled",
        },
      };
    }
    if (booking.totalAmount !== amount) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Please pay the desired amount",
        },
      };
    }
    booking.paymentStatus = "paid";
    await booking.save();
    return {
      success: true,
      message: "",
    };
  }
  async confirmBookingRepo(userId, _pnr) {
    const booking = await BookingModel.findOne({ _id: _pnr, bookedBy: userId });
    if (!booking) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "No previous bookings / Check Your PNR number",
        },
      };
    }

    booking.bookingStatus = "Confirmed";
  }

  async getBookingInfoForUser(userId, _pnr) {
    return await BookingModel.findOne({ _id: _pnr, bookedBy: userId }).populate(
      "passengers"
    );
  }

  async cancelBookingRepo(userId, _pnr) {
    const booking = await BookingModel.findOne({ _id: _pnr, bookedBy: userId });
    if (!booking) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "No previous bookings / Check Your PNR number",
        },
      };
    }
    booking.bookingStatus = "Cancelled";
    booking.paymentStatus = "Refunded";
    await booking.save();

    return {
      success: true,
    };
  }
}
