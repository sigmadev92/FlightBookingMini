import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    //_id:That will be treated as PNR number
    flightID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Pending", "initialized", "on-going"],
      default: "initialized",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Refunded"],
      default: "Unpaid",
    },

    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
