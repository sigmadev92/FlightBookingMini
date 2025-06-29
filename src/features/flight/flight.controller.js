import FlightRepository from "./flight.repository.js";
import { CustomError } from "../../middlewares/errorHandler.js";

import { sendtheMail } from "../../middlewares/nodemalier.js";
import mailOnCreatingFlight from "../../sample_data/mails/newFlightjs.js";
export default class FlightController {
  constructor() {
    this.flightRepository = new FlightRepository();
  }
  createFlight = async (req, res, next) => {
    if (req.userData.role === "user") {
      throw new CustomError(400, "You are not allowed to create Flights");
    }
    console.log(req.body);
    try {
      const data = req.body;
      data.createdBy = req.userData.userID;
      const response = await this.flightRepository.createFlightRepo(data);
      if (response.success) {
        if (!req.userData.testUser) {
          sendtheMail({
            receiver: req.userData.userMail,
            subject: "Flight Listed Successfully",
            html: mailOnCreatingFlight(response.flight),
          });
        }

        return res.status(201).json(response);
      } else return res.status(response.error.statusCode).send(response);
    } catch (error) {
      console.log("The error coming in createFlight Controller");
      next(error);
    }
  };

  searchFlights = async (req, res, next) => {
    const searchParams = req.query;
    try {
      const result = await this.flightRepository.filterFlightsRepo(
        searchParams
      );
      if (result.success) {
        return res.status(200).send({
          success: true,
          flights: result.flights,
        });
      }
      return res
        .status(result.error.statusCode)
        .send({ success: false, message: result.error.msg });
    } catch (error) {
      next(error);
    }
  };

  async getFlightInfo(req, res, next) {
    const flightId = req.params._id;
    const flight = await this.flightRepository.getFlightRepo(flightId);
    if (!flight) {
      return res
        .status(400)
        .send({ success: false, message: "No flight found. Invalid ID" });
    }
    return res.status(200).send({ success: true, flight });
  }

  async updateFlight(req, res, next) {
    if (req.userType === "user") {
      throw new CustomError(400, "You are not allowed to update Flights");
    }
    const response = await this.flightRepository.updateFlightRepo(
      req.userData.userID,
      req.params._id,
      req.body
    );
    if (response.success) {
      return res.status(201).send({
        success: true,
        message: "Flight updated Successfully",
        updatedFlight: response.flight,
      });
    }
    return res
      .status(response.error.statusCode)
      .send({ success: false, message: response.error.msg });
  }

  async deleteFlight(req, res, next) {
    if (req.userType === "user") {
      throw new CustomError(400, "You are not allowed to create Flights");
    }
    const response = await this.flightRepository.deleteFileRepo(
      req.userData.userID,
      req.params._id
    );
    console.log(response);
    if (response.deletedCount === 1) {
      return res
        .status(200)
        .send({ success: true, message: "Flight deleted successfully" });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
  }
}
