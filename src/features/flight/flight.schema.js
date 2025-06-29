import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  isFirst: {
    type: Boolean,
    required: true,
  },
  returningFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",

    unique: [true, "The returning Flight ID must be unique"],
    sparse: true,
    required: function () {
      return !this.isFirst;
    },
  },
  flightNumber: {
    type: String,
    required: true,
    unique: [true, "The flight number must be unique."],
    trim: true,
  },
  airline: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  daysOfOperation: [
    {
      type: String,
      required: true,
    },
  ],
  seatCapacity: {
    economy: { type: Number, required: true },
    premiumEconomy: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    first: { type: Number, default: 0 },
  },
  price: {
    economy: { type: Number, required: true },
    premiumEconomy: { type: Number },
    business: { type: Number },
    first: { type: Number },
  },
  status: {
    type: String,
    enum: ["Scheduled", "Cancelled", "Departed", "Arrived", "Delayed"],
    default: "Scheduled",
  },
  category: {
    type: String,
    required: true,
    enum: ["direct", "connecting", "cruise"],
  },
  stops: {
    type: [String],
    required: function () {
      return this.category === "connecting";
    },
  },
  flightImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
  },
});

const FlightModel = mongoose.model("Flight", flightSchema);

export default FlightModel;

/*
"airline":"Lufthansa"
"flightNumber": "LU101",
""

*/
