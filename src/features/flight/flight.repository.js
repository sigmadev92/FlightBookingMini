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
      console.log(error);
      console.log(_newData);
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
    const filter = {};
    if (departureCity) {
      filter.origin = departureCity;
    }
    if (arrivalCity) {
      filter.destination = arrivalCity;
    }
    if (
      seatClass !== undefined &&
      ["business", "economy", "premiumEconomy", "first"].includes(seatClass)
    ) {
      filter[`seatCapacity.${seatClass}`] = { $gte: 1 };
    } else {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Invalid Class type",
        },
      };
    }
    if (departureDate) {
      if (
        isNaN(new Date(departureDate)) ||
        new Date() > new Date(departureDate)
      ) {
        return {
          success: false,
          error: { statusCode: 400, msg: "Invalid departure date" },
        };
      }
      const day = new Date(departureDate).toString().split(" ")[0] + "day";
      filter.daysOfOperation = day;
    }
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
      const flight = await FlightModel.findOneAndUpdate(
        { _id: _flightId, createdBy: _userId },
        _data
      );
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
