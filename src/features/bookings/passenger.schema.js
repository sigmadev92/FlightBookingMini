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
  seat: {
    type: String,
    enum: ["first", "economy", "business", "premiumEconomy"],
    default: ["economy"],
  },
  price: {
    required: true,
    type: Number,
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
    minlength: 6,
    maxlength: 9,
  },
  passportExpiry: {
    type: Date,
    required: true,
    validate: {
      validator: function (val) {
        return new Date() < val;
      },
      message:
        "Your Passport expiry should be atleast 1 month more. You cannot proceed",
    },
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
