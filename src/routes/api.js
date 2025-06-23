import express from "express";
import userRoutes from "../features/user/user.routes.js";
import authRoutes from "../features/user/auth.routes.js";
import flightRoutes from "../features/flight/flight.routes.js";
import bookingRoutes from "../features/bookings/bookings.routes.js";
const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
  res.send("/api");
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use("/flights", flightRoutes);
apiRoutes.use("/bookings", bookingRoutes);

export default apiRoutes;
