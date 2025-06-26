import FlightRepository from "./flight.repository.js";
import { CustomError } from "../../middlewares/errorHandler.js";
export default class FlightController {
  constructor() {
    this.flightRepository = new FlightRepository();
  }
  async createFlight(req, res, next) {
    try {
      if (req.userType === "user") {
        throw new CustomError(400, "You are not allowed to create Flights");
      }
      const data = req.body;
      data.createdBy = req.userID;
      const response = await this.flightRepository.createFlightRepo(data);
      if (response.success) {
        return res.status(201).send({
          success: true,
          message: "Flight Created successfully",
          flight: response.flight,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async searchFlights(req, res, next) {
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
        .send(result.error.statusCode)
        .send({ success: false, message: result.error.msg });
    } catch (error) {
      next(error);
    }
  }

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
      req.userID,
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
      req.userID,
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
