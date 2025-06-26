import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  pnr_number: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },

  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  passportNumber: {
    required: true,
    type: String,
  },
  passportExpiry: {
    type: Date,
    required: true,
  },
  passportIssuingCountry: {
    type: String,
    required: true,
  },
});

const PassengerModel = mongoose.model("Passenger", passengerSchema);
export default PassengerModel;
/*
✅ 2. Passenger Information

For each passenger:

    Full name (as per passport)

    Gender

    Date of birth

    Nationality

    Passport number

    Passport expiry date

    Passport issuing country
*/
