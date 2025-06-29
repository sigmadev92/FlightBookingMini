import { weekDays } from "../../middlewares/dateFunction.js";
import FlightModel from "./flight.schema.js";

export default class FlightRepository {
  async createFlightRepo(_newData) {
    try {
      const newFlight = new FlightModel(_newData);
      await newFlight.save();
      if (!newFlight.isFirst) {
        //means we have just created a returning flight
        const firstFlight = await FlightModel.findOneAndUpdate(
          { _id: newFlight.returningFlight },
          { returningFlight: newFlight._id }
        );
        await firstFlight.save();
      }
      return {
        success: true,
        message: `${
          newFlight.isFirst ? "" : "Returning"
        } Flight created successfully.`,
        flight: newFlight,
      };
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      return {
        success: false,
        error: {
          statusCode: error.name === "MongooseError" ? 400 : 500,
          message: error.message,
        },
      };
    }
  }
  //params:{departureCity,arrivalCity,class,departureDate}
  async filterFlightsRepo(params) {
    const { departureCity, arrivalCity, seatClass, departureDate } = params;
    console.log(params);
    const filter = {};

    if (!departureCity || !arrivalCity) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Departure and Arrival City are important",
        },
      };
    }

    if (
      isNaN(new Date(departureDate)) ||
      new Date() > new Date(departureDate)
    ) {
      return {
        success: false,
        error: { statusCode: 400, msg: "Invalid departure date" },
      };
    }
    if (
      !["business", "economy", "premiumEconomy", "first", "any"].includes(
        seatClass
      )
    ) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Invalid Class type",
        },
      };
    }
    if (seatClass !== "any") {
      filter[`seatCapacity.${seatClass}`] = { $gte: 1 };
    }
    filter.origin = departureCity;
    filter.destination = arrivalCity;
    const daiyIndex = new Date(departureDate).getDay();
    const dayname = weekDays[daiyIndex] + "day";
    filter.daysOfOperation = dayname;
    console.log(filter);
    try {
      const flights = await FlightModel.find(filter);
      return {
        success: true,
        flights,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: error.message,
        },
      };
    }
  }

  async getFlightRepo(_id) {
    return await FlightModel.findById(_id);
  }

  async updateFlightRepo(_userId, _flightId, _data) {
    try {
      const flight = await FlightModel.findOne({
        _id: _flightId,
        createdBy: _userId,
      });
      await flight.updateOne(_data);
      await flight.save();
      if (!flight) {
        return {
          success: false,
          error: {
            statusCode: 400,
            msg: "Invalid credentials",
          },
        };
      }
      return {
        success: true,
        flight,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: error.message,
        },
      };
    }
  }

  async deleteFileRepo(_userId, _flightId) {
    return await FlightModel.deleteOne({ _id: _flightId, createdBy: _userId });
  }
}
